const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Carregar imagens e áudio
const imgPlayer = new Image();
const imgObstacle = new Image();
const imgSlowdown = new Image();
const imgBackground = new Image();
const bgMusic = new Audio();
const collectSound = new Audio();

// Definir sources 
imgPlayer.src = 'player.png';
imgObstacle.src = 'clt.png';
imgSlowdown.src = 'jones.png';
imgBackground.src = 'background.png';
bgMusic.src = 'music.mp3';
collectSound.src = 'collect.mp3';

// Configurações de áudio
bgMusic.loop = true;
bgMusic.volume = 0.7;
let gameStarted = false;
collectSound.volume = 0.7;

// Objetos do jogo / CLT
const player = {
  x: 280,
  y: 350,
  width: 80,
  height: 80,
  vx: 0,
  vy: 0,
  onGround: true
};

let gravity = 0.6;
let jumpStrength = -10;
let speed = 4;
let obstacles = [];
let slowdownItems = [];
let obstacleSpeed = 2;
let frame = 0;
let score = 0;
let gameOver = false;
let buffsCollected = 0;
let playerNickname = '';

//Balanceamento do bonus por probabilidade.
let obstacleSpawnRate = 1;
const initialDelay = 5 * 60; //primeiro bonus (em frames, 60 frames = 1 segundo)
const cooldown = 10 * 60; // segundo bonus (em frames)
const probPeriod = 20 * 60; // período bonus por probabilidade (em frames)
const slowdownChance = 0.4; //chance de receber o bonus (40%)
const baseSpeed = 2;
const growthFactor = 0.5;

let firstSlowdownGiven = false;
let secondSlowdownGiven = false;
let lastSlowdownTime = 0;
let currentProbWindowStart = initialDelay + cooldown;
let slowdownGivenInThisWindow = false;

// Tela inicial: 

function showStartScreen() {
  const startContainer = document.createElement('div');
  // Adiciona a classe genérica de overlay E a classe específica de start
  startContainer.classList.add('overlay-screen', 'start-container');
  startContainer.id = 'startContainer'; // Mantém o ID para referência, se necessário

  // Título do jogo
  const title = document.createElement('h1');
  title.textContent = 'TRABALHAR NÃO DÁ REVIEW NO LETTERBOXD';
  title.classList.add('game-title'); // Usa classe CSS

  // Input para o nickname
  const nicknameInput = document.createElement('input');
  nicknameInput.setAttribute('type', 'text');
  nicknameInput.setAttribute('placeholder', 'Seu Nickname (até 8 letras)');
  nicknameInput.setAttribute('maxlength', '8');
  nicknameInput.classList.add('nickname-input'); // Usa classe CSS

  // Mensagem de erro para o nickname
  const nicknameError = document.createElement('p');
  nicknameError.classList.add('nickname-error'); // Usa classe CSS
  nicknameError.style.display = 'none'; // Este estilo permanece no JS para controle dinâmico

  // Botão de start
  const startButton = document.createElement('button');
  startButton.textContent = 'START!';
  // Adiciona a classe genérica de botão E a classe específica de start
  startButton.classList.add('game-button', 'start-button'); // Usa classe CSS

  // Evento de clique do botão Start
  startButton.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    if (nickname.length === 0 || nickname.length > 8) {
      nicknameError.textContent = 'O nickname deve ter entre 1 e 8 letras.';
      nicknameError.style.display = 'block';
      return;
    }
    playerNickname = nickname; // Armazena o nickname do jogador
    nicknameError.style.display = 'none'; // Oculta a mensagem de erro se o nickname for válido

    bgMusic.play().then(() => {
      startContainer.style.opacity = '0';
      startContainer.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        document.body.removeChild(startContainer);
        gameStarted = true;
        gameLoop();
      }, 500);
    }).catch(error => {
      console.error("Erro ao iniciar música:", error);
      startButton.textContent = 'CLIQUE NOVAMENTE';
      // Mantendo este estilo aqui porque é uma mudança de estado específica do JS (feedback ao usuário)
      startButton.style.backgroundColor = 'rgb(108, 95, 95)';
    });
  });

  startContainer.appendChild(title);
  startContainer.appendChild(nicknameInput); // Adiciona o input do nickname
  startContainer.appendChild(nicknameError); // Adiciona a mensagem de erro
  startContainer.appendChild(startButton);
  document.body.appendChild(startContainer);

  drawBackground();
}

// Desenhar background (chamado uma vez na tela inicial para garantir que o canvas não esteja vazio)
function drawBackground() {
  ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);
}

// Mostrar tela inicial assim que a página carregar
window.addEventListener('load', () => {
  showStartScreen();
});

// Controles do jogador
document.addEventListener("keydown", (e) => {
  if (!gameStarted || gameOver) return; // Ignora se o jogo não começou ou já acabou

  if (e.key === "ArrowLeft") player.vx = -speed;
  if (e.key === "ArrowRight") player.vx = speed;
  if (e.key === "ArrowUp" && player.onGround) {
    player.vy = jumpStrength;
    player.onGround = false;
  }
});

document.addEventListener("keyup", () => player.vx = 0); // Para o movimento horizontal quando a tecla é solta

// Obstáculos e Slowdown Items
function spawnObstacle() {
  obstacles.push({
    x: Math.random() * (canvas.width - 60), // Posição X aleatória
    y: 0, // Começa no topo
    width: 50,
    height: 50,
  });
}

function spawnSlowdown() {
  slowdownItems.push({
    x: Math.random() * (canvas.width - 60), // Posição X aleatória
    y: 0, // Começa no topo
    width: 70, // Um pouco maior para ser mais visível
    height: 70,
  });
}

// Melhoria da Hitbox (ajusta a área de colisão para ser um pouco menor que a imagem)
function checkCollision(a, b, scale = 1) {
  const ax = a.x + (1 - scale) * a.width / 2;
  const ay = a.y + (1 - scale) * a.height / 2;
  const aw = a.width * scale;
  const ah = a.height * scale;

  const bx = b.x + (1 - scale) * b.width / 2;
  const by = b.y + (1 - scale) * b.height / 2;
  const bw = b.width * scale;
  const bh = b.height * scale;

  return ax < bx + bw &&
         ax + aw > bx &&
         ay < by + bh &&
         ay + ah > by;
}

// Atualizações que acontecem dentro do game / gameplay (lógica do jogo)
function update() {
  if (gameOver || !gameStarted) return;

  frame++;
  score++;

  // Queda dos obstáculos e aumento da taxa de spawn
  if (frame % Math.floor(60 / obstacleSpawnRate) === 0) {
    spawnObstacle();
  }

  // Aumenta a taxa de spawn de obstáculos a cada 2 segundos (120 frames)
  if (frame % 120 === 0) {
    obstacleSpawnRate = 2 + 0.5 * Math.sqrt(frame / 180);
  }
  // Aumento da velocidade em que os obstáculos caem (função da raiz quadrada para um aumento gradual)
  obstacleSpeed = baseSpeed + growthFactor * Math.sqrt(frame / 60);

  // Lógica de spawn de Buffs (Slowdown Items)
  if (!firstSlowdownGiven && frame >= initialDelay) {
    spawnSlowdown();
    firstSlowdownGiven = true;
    lastSlowdownTime = frame;
  } else if (!secondSlowdownGiven && frame >= initialDelay + cooldown) {
    spawnSlowdown();
    secondSlowdownGiven = true;
    lastSlowdownTime = frame;
    currentProbWindowStart = frame;
    slowdownGivenInThisWindow = false; // Reseta para a nova janela de probabilidade
  } else {
    // Lógica de spawn por probabilidade após os dois primeiros garantidos
    if (frame >= currentProbWindowStart + probPeriod) {
      currentProbWindowStart = frame;
      slowdownGivenInThisWindow = false; // Inicia uma nova janela de probabilidade
    }
    if (!slowdownGivenInThisWindow && frame >= currentProbWindowStart) {
      if (Math.random() < slowdownChance) {
        spawnSlowdown();
        slowdownGivenInThisWindow = true;
        lastSlowdownTime = frame;
      }
    }
  }

  // Atualização da posição do jogador
  player.x += player.vx;
  // Limites da tela para o jogador
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

  // Aplica gravidade ao jogador para o pulo
  player.y += player.vy;
  player.vy += gravity;

  // Colisão do jogador com o chão
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.vy = 0;
    player.onGround = true;
  }

  // Atualiza posição dos obstáculos e verifica colisão com o jogador
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.y += obstacleSpeed;
    // Ajuste da hitbox - favorecendo o player (0.7 significa 70% do tamanho para colisão)
    if (checkCollision(player, o, 0.7)) {
      gameOver = true;
      bgMusic.pause();
      showGameOver();
    }
    // Remove obstáculos que saem da tela
    if (o.y > canvas.height) {
      obstacles.splice(i, 1);
    }
  }

  // Atualiza posição dos slowdown items e verifica colisão com o jogador
  for (let i = slowdownItems.length - 1; i >= 0; i--) {
    let item = slowdownItems[i];
    item.y += 2; // Velocidade de queda do item é fixa
    // Hitbox mantida 1:1 para itens coletáveis
    if (checkCollision(player, item, 1)) {
      obstacleSpeed = Math.max(1, obstacleSpeed * 0.9); // Reduz a velocidade dos obstáculos
      slowdownItems.splice(i, 1); // Remove o item
      buffsCollected++; // Incrementa o contador de buffs
      collectSound.play(); // Toca o som de coleta
    }
    // Remove itens que saem da tela
    if (item.y > canvas.height) {
      slowdownItems.splice(i, 1);
    }
  }
}

// Mostrar tela de game over
async function showGameOver() {
  bgMusic.pause(); // Garante que a música pare

  // URL backend Vercel
  const backendUrl = 'https://game-cinefilo.vercel.app/api'; // Este já inclui '/api'

  // Enviar o score para o backend
  if (playerNickname && score > 0) { // Envie apenas se houver nickname e score válido
    try {
      const response = await fetch(`${backendUrl}/scores`, { // REMOVIDO o '/api' extra aqui
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: playerNickname,
          score: score
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Falha ao enviar pontuação:', errorData.message);
      } else {
        console.log('Pontuação enviada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar pontuação para o backend:', error);
    }
  }

  // Buscar e exibir o ranking
  let topScores = [];
  try {
    const response = await fetch(`${backendUrl}/scores/top10`); // REMOVIDO o '/api' extra aqui
    if (response.ok) {
      topScores = await response.json();
    } else {
      console.error('Falha ao buscar as maiores pontuações.');
    }
  } catch (error) {
    console.error('Erro ao buscar as maiores pontuações:', error);
  }

  const gameOverScreen = document.createElement('div');
  // Adiciona a classe genérica de overlay E a classe específica de game over
  gameOverScreen.classList.add('overlay-screen', 'game-over-screen'); // Usa classe CSS

  const gameOverText = document.createElement('h1');
  gameOverText.textContent = 'VOCÊ FOI CONTRATADO.';
  gameOverText.classList.add('game-over-title'); // Usa classe CSS

  const scoreText = document.createElement('div');
  scoreText.textContent = `Pontuação: ${score}`;
  scoreText.classList.add('final-score-text'); // Usa classe CSS

  // Tabela de ranking
  const rankingTitle = document.createElement('h2');
  rankingTitle.textContent = 'TOP 10 PONTUAÇÕES';
  rankingTitle.classList.add('ranking-title'); // Usa classe CSS

  const rankingList = document.createElement('ul');
  rankingList.classList.add('ranking-list'); // Usa classe CSS

  if (topScores.length > 0) {
    topScores.forEach((s, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${s.nickname} - ${s.score}`;
      rankingList.appendChild(listItem);
    });
  } else {
    const noScores = document.createElement('li');
    noScores.textContent = 'Nenhuma pontuação registrada ainda.';
    noScores.classList.add('no-scores'); // Usa classe CSS para "no scores"
    rankingList.appendChild(noScores);
  }

  const restartButton = document.createElement('button');
  restartButton.textContent = 'JOGAR NOVAMENTE';
  // Adiciona a classe genérica de botão E a classe específica de restart
  restartButton.classList.add('game-button', 'restart-button');

  restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
  });

  gameOverScreen.appendChild(gameOverText);
  gameOverScreen.appendChild(scoreText);
  gameOverScreen.appendChild(rankingTitle); // Adiciona o título do ranking
  gameOverScreen.appendChild(rankingList); // Adiciona a lista de ranking
  gameOverScreen.appendChild(restartButton);
  document.body.appendChild(gameOverScreen);
}

// Desenho (tudo que é visível no canvas)
function draw() {
  ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

  if (gameStarted && !gameOver) {
    // Desenha o jogador
    ctx.drawImage(imgPlayer, player.x, player.y, player.width, player.height);

    // Desenha os obstáculos
    for (let o of obstacles) {
      ctx.drawImage(imgObstacle, o.x, o.y, o.width, o.height);
    }

    // Desenha os itens de slowdown
    for (let item of slowdownItems) {
      ctx.drawImage(imgSlowdown, item.x, item.y, item.width, item.height);
    }

    // Desenha o texto de pontuação, tempo e buffs no canvas
    ctx.fillStyle = "white"; // Cor do texto
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Pontos: " + score, 20, 40);
    ctx.fillText("Tempo: " + Math.floor(frame / 60) + "s", 20, 70);
    ctx.fillText("Absolutes Cinema: " + buffsCollected, 20, 100);
  }
}

// Loop principal do jogo
function gameLoop() {
  update(); // Atualiza a lógica do jogo
  draw(); // Redesenha a tela
  if (!gameOver) {
    requestAnimationFrame(gameLoop); // Continua o loop se o jogo não acabou
  }
}
