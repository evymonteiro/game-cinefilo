const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameWrapper = document.getElementById('game-wrapper');
let currentScale = 1;


// CRIAÇÃO DE BOTÕES VIRTUAIS PARA USO EM TOUCHSCREEN:

// Referências aos botões:
const touchControlsContainer = document.getElementById('touchControls');
const leftTouchBtn = document.getElementById('leftBtn');
const rightTouchBtn = document.getElementById('rightBtn');
const jumpTouchBtn = document.getElementById('jumpBtn');

let keys = {
    left: false,
    right: false,
    up: false,    
    space: false  
};

// Variáveis para controlar o estado dos botões de toque
let isLeftTouched = false;
let isRightTouched = false;
let isJumpTouched = false; 

// Função para detectar se é um dispositivo de toque
function isTouchDevice() {
    //Verifica se o navegador suporta eventos de toque ou se há pontos de toque.
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}
// Listeners
//Esq
function setupTouchListeners() {
    leftTouchBtn.addEventListener('touchstart', (e) => { 
        e.preventDefault(); 
        isLeftTouched = true; 
        leftTouchBtn.classList.add('active'); 
    }, { passive: false });
    leftTouchBtn.addEventListener('touchend', (e) => { 
        e.preventDefault(); 
        isLeftTouched = false; 
        leftTouchBtn.classList.remove('active'); 
    });
    leftTouchBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault(); 
        isLeftTouched = false; 
        leftTouchBtn.classList.remove('active'); 
    });
    
    //Direita
    rightTouchBtn.addEventListener('touchstart', (e) => { 
        e.preventDefault(); 
        isRightTouched = true; 
        rightTouchBtn.classList.add('active'); 
    }, { passive: false });
    rightTouchBtn.addEventListener('touchend', (e) => { 
        e.preventDefault(); 
        isRightTouched = false; 
        rightTouchBtn.classList.remove('active'); 
    });
    rightTouchBtn.addEventListener('touchcancel', (e) => { 
        e.preventDefault(); 
        isRightTouched = false; 
        rightTouchBtn.classList.remove('active'); 
    });

    // Pular
    jumpTouchBtn.addEventListener('touchstart', (e) => { 
        e.preventDefault(); 
        isJumpTouched = true; 
        jumpTouchBtn.classList.add('active'); 
    }, { passive: false });
    jumpTouchBtn.addEventListener('touchend', (e) => { 
        e.preventDefault(); 
        isJumpTouched = false; 
        jumpTouchBtn.classList.remove('active'); 
    });
    jumpTouchBtn.addEventListener('touchcancel', (e) => { 
        e.preventDefault(); 
        isJumpTouched = false; 
        jumpTouchBtn.classList.remove('active'); 
    });

    // Impedir Scroll
    const gameCanvas = document.getElementById('gameCanvas'); // Pegue a referência ao seu canvas
    if (gameCanvas) {
        gameCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); }, { passive: false });
        gameCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
    }
}

// IMAGENS E AUDIOS:

///PLAYER: 

let chosenPlayerImage = null; 

const player_dog = new Image();
const player_hulk = new Image();
const player_wolv = new Image();
const player_cat = new Image();
const imgChoosePlayer = [
    { id: 'dog', img: player_dog, src: 'player_dog.png' },
    { id: 'hulk', img: player_hulk, src: 'player_hulk.png' },
    { id: 'wolv', img: player_wolv, src: 'player_wolv.png' },
    { id: 'cat', img: player_cat, src: 'player_cat.png' }
];

const gameOverMusic = new Audio();
gameOverMusic.src = 'game_over.mp3';
gameOverMusic.volume = 0.8;
gameOverMusic.loop = true

// STAGE 1
const imgObstacle = new Image(); // Obstáculo Stage 1 (CLT)
const imgSlowdown = new Image(); // Item de slowdown Stage 1 (Absolute Cinema)
const imgBackground = new Image(); // Background Stage 1
const bgMusic = new Audio(); // Música Stage 1
const collectSound = new Audio(); // Som de coleta Stage 1
const buff_score = 150; // Pontuação para o buff de slowdown
const imgShield = new Image();
const shieldSound = new Audio();
const bone_mubi = new Image();
const bone_mst = new Image();
const bone_forrest = new Image();
const bonezin_assets = [bone_forrest, bone_mst, bone_mubi];
let bonezin = [];
const collectSound2 = new Audio();
let lastBonezinSpawnFrame = 0;



///STAGE 2:
const imgSt2 = new Image(); // Imagem do obstáculo tipo 1 da Stage 2
const Obstacle2 = [imgSt2, imgObstacle]; /// imagens que podem ser assumidas pelos obstáculos da Stage 2
const collectSoundSt2 = new Audio(); // Som de coleta Stage 2
const imgBackgroundSt2 = new Image(); // Background Stage 2
const bgMusicSt2 = new Audio(); // Música Stage 2
const imgVillain = new Image(); // Imagem do vilão
const imgCollectibleSt2 = new Image();  // Coletável Stage 2

///STAGE 3: FINAL

const imgBackgroundSt3 = new Image(); // Background para a Stage 3
const bgMusicSt3 = new Audio();       // Musica para a Stage 3

const witch = new Image();
const hereditary = new Image();
const bodies = new Image();
const midsommar = new Image();
const talk = new Image();
const farol = new Image();
const bring = new Image();
const deer = new Image();

const st3platforms = [witch, hereditary, bodies, midsommar, talk,
    farol, bring, deer
];

// SOURCES

//stg1

imgChoosePlayer.forEach(p => p.img.src = p.src); 
imgObstacle.src = 'clt.png';
imgSlowdown.src = 'jones.png';
imgBackground.src = 'background.png';
bgMusic.src = 'music.mp3';
collectSound.src = 'collect.mp3';
imgShield.src = 'shield.png';
bone_mubi.src = 'bone.png'
bone_mst.src = 'mst.png'
bone_forrest.src = 'forrest.png'
collectSound2.src = 'collectSound2.mp3'

//stg 2

imgSt2.src = 'imgSt2.png';
imgBackgroundSt2.src = 'imgBackgroundSt2.png';
collectSoundSt2.src = 'collectSoundSt2.mp3';
bgMusicSt2.src = 'bgMusicSt2.mp3';
imgVillain.src = 'vilain.png';
imgCollectibleSt2.src = 'imgCollectibleSt2.png';

//stg 3

imgBackgroundSt3.src = 'background_stage3.png';
bgMusicSt3.src = 'music_stage3.mp3';
witch.src = 'witch.png';
hereditary.src = 'hereditary.png'
bodies.src = 'bodies.png'
midsommar.src = 'midsommar.png'
talk.src = 'talk.png'
farol.src = 'farol.png'
bring.src = 'bring.png'
deer.src = 'deer.png'


/// CONFIG ÁUDIO: 

// stg 1
bgMusic.loop = true;
bgMusic.volume = 0.7;
let gameStarted = false;
collectSound.volume = 0.7;

// stg 2
bgMusicSt2.loop = true;
bgMusicSt2.volume = 0.7;
collectSoundSt2.volume = 0.7;

// stg 3

bgMusicSt3.loop = true;
bgMusicSt3.volume = 0.7;
collectSoundSt2.volume = 0.7;


/// AJUSTE TAMANHO MOBILE:

const GAME_ORIGINAL_WIDTH = 1100; 
const GAME_ORIGINAL_HEIGHT = 700; 

function resizeGame() {
    const wrapperWidth = gameWrapper.clientWidth;   
    const wrapperHeight = gameWrapper.clientHeight; 

    let newWidth, newHeight;
    const gameRatio = GAME_ORIGINAL_WIDTH / GAME_ORIGINAL_HEIGHT; 
    if (wrapperWidth / wrapperHeight > gameRatio) {
        newHeight = wrapperHeight;
        newWidth = newHeight * gameRatio;
    } else {
        newWidth = wrapperWidth;
        newHeight = newWidth / gameRatio;
    }

    // Define as dimensões do canvas
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // Atualiza a variável global currentScale
    currentScale = newWidth / GAME_ORIGINAL_WIDTH; // Ou newHeight / GAME_ORIGINAL_HEIGHT, deve ser o mesmo

    // Ajusta as propriedades do player com base na nova escala
    player.x = (GAME_ORIGINAL_WIDTH / 4) * currentScale; 
    player.y = (GAME_ORIGINAL_HEIGHT - (player.height * currentScale)); // Ajusta para o chão usando a altura escalada
    
    player.width = 80 * currentScale; 
    player.height = 90 * currentScale; 

    // Ajusta as velocidades e gravidade para manter a jogabilidade consistente
    gravity = 0.6 * currentScale;
    jumpStrength = -15 * currentScale;
    speed = 4 * currentScale;
    
    // NOVO: Ajusta as dimensões dos elementos existentes no jogo caso estejam em tela
    // Isso é importante para evitar que objetos fiquem com tamanhos incorretos ao redimensionar
    // enquanto o jogo está rodando.
    obstacles.forEach(o => {
        o.width = 60 * currentScale;
        o.height = 60 * currentScale;
        // Ajusta a posição Y para que o objeto continue caindo da proporção correta
        // Assumimos que a posição X já está ok se os objetos são spawnados aleatoriamente
    });
    slowdownItems.forEach(item => {
        item.width = 90 * currentScale;
        item.height = 90 * currentScale;
    });
    shieldItems.forEach(item => {
        item.width = 80 * currentScale;
        item.height = 80 * currentScale;
    });
    bonezin.forEach(item => {
        item.width = 80 * currentScale;
        item.height = 80 * currentScale;
    });
    stage2Obstacles.forEach(o => {
        o.width = 100 * currentScale;
        o.height = 100 * currentScale;
    });
    stage2Collectibles.forEach(item => {
        item.width = 90 * currentScale;
        item.height = 90 * currentScale;
    });

    villain.width = 300 * currentScale;
    villain.height = 800 * currentScale;
    villain.y = (GAME_ORIGINAL_HEIGHT - villain.height); // Ajusta vilão para o chão
    
    // Re-desenha o jogo imediatamente após o redimensionamento
    drawGame();
}


// Objetos do jogo
const player = {
    x: 280, 
    y: 350,
    width: 80,
    height: 90,
    vx: 0,
    vy: 0,
    onGround: true
};

const villain = {
    x: -100, 
    y: 0, 
    width: 300,
    height: 800, 
};

//ATRIBUTOS DO GAME:

let gravity = 0.6;
let jumpStrength = -15; // Pulo do player maior
let speed = 4; // Velocidade de movimento horizontal do player
let villainSpeed = 0.002;

//Stage 1:

let obstacles = [];
let slowdownItems = [];
let shieldItems = []; 
let obstacleSpeed = 2; 
let frame = 0;
let score = 0;
let gameOver = false;
let buffsCollected = 0;
let playerNickname = '';
let scorePopups = []; 
let isShieldActive = false; 
let shieldTimer = 0; 
const SHIELD_DURATION = 5 * 60; 
let currentStage = 1;
const STAGE_TRANSITION_SCORE = 10000;
const STAGE2_TRANSITION_SCORE = 17500;
let showStageMessage = false;
let stageMessageAlpha = 1.0;
let stageMessageTimer = 0;
const STAGE_MESSAGE_DURATION = 3 * 60; 

//Balanceamento do bonus por probabilidade da stage 1.
let obstacleSpawnRate = 1;
const initialDelay = 5 * 60;
const cooldown = 10 * 60;
const probPeriod = 20 * 60;
const slowdownChance = 0.4;
const baseSpeed = 2;
const growthFactor = 0.69;

let firstSlowdownGiven = false;
let secondSlowdownGiven = false;
let lastSlowdownTime = 0;
let currentProbWindowStart = initialDelay + cooldown;
let slowdownGivenInThisWindow = false;

// Stage 2:

let stage2Obstacles = [];
let stage2ObstacleSpeed = 4; // **AUMENTE este valor para os obstáculos virem mais rápido**
let backgroundScrollSpeed = 1.0; // **Velocidade de scroll do background**
let stage2SpawnInterval = 40; // Intervalo de frames entre spawns de obstáculos (menor = mais frequente)
let lastObstacleSpawnTime = 0; // Armazena o frame do último spawn
let stage2Collectibles = [];
const STAGE2_COLLECTIBLE_SPAWN_INTERVAL = 20 * 60;
let lastCollectibleSpawnTime = 0;
let lastObstacleX = canvas.width; 
const MIN_GAP = player.width * 2; // Espaçamento mínimo entre obstáculos (2x o tamanho do player)
const MAX_GAP = canvas.width; // Espaçamento máximo entre obstáculos (aumentado para permitir maiores vazios)
let backgroundSt2X = 0;  // Variável para o deslocamento do fundo da Stage 2

//// STAGE 3 PROPRIEDADES


// TELA INICIAL BOTOES DE INFORMAÇÕES:

document.addEventListener('DOMContentLoaded', () => {
    const instructionsBtn = document.getElementById('instructionsBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const instructionsModal = document.getElementById('instructionsModal');
    const aboutModal = document.getElementById('aboutModal');
    const closeInstructionsBtn = document.getElementById('closeInstructions');
    const closeAboutBtn = document.getElementById('closeAbout');
    // Abre as instruções:
    instructionsBtn.addEventListener('click', () => {
        instructionsModal.style.display = 'flex';
    });
    // Fecha as instruções:
    closeInstructionsBtn.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
    });
    // Abre o Sobre
    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'flex';
    });
    // Fecha o Sobre
    closeAboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });
    // Fecha as janelas ao clicar fora dela. 
    window.addEventListener('click', (event) => {
        if (event.target == instructionsModal) {
            instructionsModal.style.display = 'none';
        }
        if (event.target == aboutModal) {
            aboutModal.style.display = 'none';
        }
    });

    // Controles virtuais e orientação de página para mobile:

    if (isTouchDevice()) {
        touchControlsContainer.style.display = 'flex'; 
        setupTouchListeners();
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape')
                .then(() => console.log('Orientação travada para paisagem'))
                .catch((err) => console.warn('Não foi possível travar a orientação:', err));
        } else if (screen.lockOrientation) {
            screen.lockOrientation('landscape');
            console.log('Orientação travada (legacy) para paisagem');
        } else {
            console.warn('API Screen Orientation Lock não suportada.');
        }
        window.addEventListener('orientationchange', () => {
        resizeGame(); // Redimensiona o jogo ao mudar a orientação
        });

    } else {
        touchControlsContainer.style.display = 'none';
    }
    // Chama resizeGame() no carregamento inicial da página
    resizeGame(); 
    
    // Chama resizeGame() sempre que a janela for redimensionada
    window.addEventListener('resize', resizeGame);
});

const topButtonsContainer = document.querySelector('.top-buttons-container'); 
//Funções para controlar a visibilidade dos botões superiores
function hideTopButtons() {
    if (topButtonsContainer) {
        topButtonsContainer.style.display = 'none';
    }
}
function showTopButtons() {
    if (topButtonsContainer) {
        topButtonsContainer.style.display = 'flex';
    }
}

/// TELA INICIAL: START E CANVAS. 

function showStartScreen() {
    showTopButtons();
    const startContainer = document.createElement('div');
    startContainer.classList.add('overlay-screen', 'start-container');
    startContainer.id = 'startContainer';

    const title = document.createElement('h1');
    title.textContent = 'TRABALHAR NÃO DÁ REVIEW NO LETTERBOXD';
    title.classList.add('game-title');

    const nicknameInput = document.createElement('input');
    nicknameInput.setAttribute('type', 'text');
    nicknameInput.setAttribute('placeholder', 'Nickname');
    nicknameInput.setAttribute('maxlength', '8');
    nicknameInput.classList.add('nickname-input');

    const nicknameError = document.createElement('p');
    nicknameError.classList.add('nickname-error');
    nicknameError.style.display = 'none';

    const playerSelectionContainer = document.createElement('div');
    playerSelectionContainer.classList.add('player-selection-container');

    const playerSelectionTitle = document.createElement('h2');
    playerSelectionTitle.textContent = 'Escolha seu personagem:';
    playerSelectionTitle.classList.add('player-selection-title');

    const playerImagesContainer = document.createElement('div');
    playerImagesContainer.classList.add('player-images-container');

    let selectedPlayerId = null; 

    imgChoosePlayer.forEach(pData => {
        const playerImageWrapper = document.createElement('div');
        playerImageWrapper.classList.add('player-image-wrapper');
        playerImageWrapper.dataset.playerId = pData.id; 

        const playerImage = document.createElement('img');
        playerImage.src = pData.src; 
        playerImage.alt = pData.id;
        playerImage.classList.add('player-select-image');

        playerImageWrapper.addEventListener('click', () => {
            document.querySelectorAll('.player-image-wrapper.selected').forEach(el => {
                el.classList.remove('selected');
            });
            playerImageWrapper.classList.add('selected');
            selectedPlayerId = pData.id; 
            nicknameError.style.display = 'none'; 
        });
        playerImageWrapper.appendChild(playerImage);
        playerImagesContainer.appendChild(playerImageWrapper);
    });

    playerSelectionContainer.appendChild(playerSelectionTitle);
    playerSelectionContainer.appendChild(playerImagesContainer);

    const startButton = document.createElement('button');
    startButton.textContent = 'START!';
    startButton.classList.add('game-button', 'start-button');

    startButton.addEventListener('click', () => {
        const nickname = nicknameInput.value.trim();
        if (nickname.length === 0 || nickname.length > 8) {
            nicknameError.textContent = 'O nickname deve ter entre 1 e 8 letras.';
            nicknameError.style.display = 'block';
            return;
        }
        if (selectedPlayerId === null) {
            nicknameError.textContent = 'Por favor, escolha um personagem.';
            nicknameError.style.display = 'block';
            return;
        }
        hideTopButtons();
        chosenPlayerImage = imgChoosePlayer.find(pData => pData.id === selectedPlayerId).img;
        playerNickname = nickname;
        nicknameError.style.display = 'none';
        bgMusic.play().then(() => {
            startContainer.style.opacity = '0';
            startContainer.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                document.body.removeChild(startContainer);
                showStageMessage = true;
                stageMessageAlpha = 1.0;
                stageMessageTimer = STAGE_MESSAGE_DURATION; 
                gameStarted = true;
                gameLoop(); 
            }, 500); 
        }).catch(error => {
            console.error("Erro ao iniciar música:", error);
            startButton.textContent = 'CLIQUE NOVAMENTE';
            startButton.style.backgroundColor = 'rgb(108, 95, 95)';
        });
    });

    startContainer.appendChild(title);
    startContainer.appendChild(nicknameInput);
    startContainer.appendChild(nicknameError);
    startContainer.appendChild(playerSelectionContainer); 
    startContainer.appendChild(startButton);
    document.body.appendChild(startContainer);

    drawBackground(); 
}

// Desenhar background baseado na fase
function drawBackground() {
    if (currentStage === 1) {
        ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);
    } else if (currentStage === 2) {
        // Usa a nova velocidade de scroll para o background
        ctx.drawImage(imgBackgroundSt2, backgroundSt2X, 0, canvas.width, canvas.height);
        ctx.drawImage(imgBackgroundSt2, backgroundSt2X + canvas.width, 0, canvas.width, canvas.height);
    }
    else if (currentStage === 3) {
        ctx.drawImage(imgBackgroundSt3, 0, 0, canvas.width, canvas.height);
    }
}

// Mostrar tela inicial assim que a página carregar
window.addEventListener('load', () => {
    showStartScreen();
});

// Controles do jogador

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === " ") keys.space = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === " ") keys.space = false;
});
document.addEventListener("keyup", (e) => {
    if (currentStage === 1 || currentStage === 2) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.vx = 0;
    }
});

 /////////////////////////////////////////
 //// OBSTÁCULOS E ITENS FASE 1 /////////
 ////////////////////////////////////////

 function spawnObstacle() {
    obstacles.push({
        x: Math.random() * (canvas.width - (60 * currentScale)),
        y: 0,
        width: 60 * currentScale,
        height: 60 * currentScale,
    });
}
function spawnSlowdown() {
    slowdownItems.push({
        x: Math.random() * (canvas.width - (90 * currentScale)),
        y: 0,
        width: 90 * currentScale,
        height: 90 * currentScale,
    });
}
function spawnShield() {
    shieldItems.push({
        x: Math.random() * (canvas.width - (80 * currentScale)),
        y: 0,
        width: 80 * currentScale, 
        height: 80 * currentScale, 
        image: imgShield,
    });
}
function spawnBonezin() {
    const randomImageIndex = Math.floor(Math.random() * bonezin_assets.length);
    const chosenImage = bonezin_assets[randomImageIndex];
    bonezin.push({
        x: Math.random() * (canvas.width - (70 * currentScale)), 
        y: -(70 * currentScale), 
        width: 80 * currentScale,
        height: 80 * currentScale,
        image: chosenImage
    });
}


///////////////////////////////////////
///// OBSTCÁCULOS E ITENS FASE 2 //////
//////////////////////////////////////

// Spawn de obstáculos para a Stage 2

function spawnStage2Obstacle() {
    const obstacleWidth = 100 * currentScale; // Tamanho fixo para os obstáculos da Stage 2
    const obstacleHeight = 100 * currentScale;
    const groundLevel = canvas.height; 
    const obstacleY = groundLevel - obstacleHeight; 
    // Lógica para espaçamento entre obstáculos
    const lastObstacle = stage2Obstacles[stage2Obstacles.length - 1];
    let newObstacleX = canvas.width; 

    if (lastObstacle) {
        const lastObstacleRight = lastObstacle.x + lastObstacle.width;
        // O randomGap agora pode ser um pouco maior para evitar um "muro"
        const randomGap = Math.random() * ((MAX_GAP * currentScale) - (MIN_GAP * currentScale)) + (MIN_GAP * currentScale); 
        newObstacleX = lastObstacleRight + randomGap;

        if (newObstacleX < lastObstacleRight + (MIN_GAP * currentScale)) {
            newObstacleX = lastObstacleRight + (MIN_GAP * currentScale);
        }
    }
    // Se o novo obstáculo aparecer muito fora da tela (longe demais), ajusta para mais perto
    if (newObstacleX > canvas.width + (MAX_GAP * currentScale)) {
        newObstacleX = canvas.width + Math.random() * ((MAX_GAP * currentScale) / 2); 
    }

    const randomImageIndex = Math.floor(Math.random() * Obstacle2.length);
    const chosenImage = Obstacle2[randomImageIndex];
    stage2Obstacles.push({
        x: newObstacleX, 
        y: obstacleY, 
        width: obstacleWidth,
        height: obstacleHeight,
        image: chosenImage
    });
}

// Spawn de objeto coletável aleatório para a Stage 2
function spawnStage2Collectible() {
    const collectibleSize = 90 * currentScale;
    const groundLevel = canvas.height;
    const collectibleY = groundLevel - collectibleSize - (Math.random() * 100 * currentScale); // Perto do chão, com variação

    stage2Collectibles.push({
        x: canvas.width,
        y: collectibleY,
        width: collectibleSize,
        height: collectibleSize
    });
}

/////////////////////////////////////
//////// FUNÇÃO GLOBAL - HITBOX /////
/////////////////////////////////////


function checkCollision(a, b, collisionScale = 1) {
    const ax = a.x + (1 - collisionScale) * a.width / 2;
    const ay = a.y + (1 - collisionScale) * a.height / 2;
    const aw = a.width * collisionScale;
    const ah = a.height * collisionScale;

    const bx = b.x + (1 - collisionScale) * b.width / 2;
    const by = b.y + (1 - collisionScale) * b.height / 2;
    const bw = b.width * collisionScale;
    const bh = b.height * collisionScale;

    return ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by;
}


/////////////////////////////////////////////////
///////////////// U P D A T E S /////////////////
////////////////////////////////////////////////

//################################################//
//### FUNÇÃO DE ATUALIZAÇÃO PARA A STAGE 1 /########/
//################################################//

function updateStage1() {

    if (keys.left || isLeftTouched) {
        player.vx = -speed;
    } else if (keys.right || isRightTouched) {
        player.vx = speed;
    } else {
        player.vx = 0;
    }

    // Lógica de pulo
    if ((keys.up || keys.space || isJumpTouched) && player.onGround) {
        player.vy = jumpStrength;
        player.onGround = false;
        isJumpTouched = false;
        keys.up = false;
        keys.space = false;
    }

    player.x += player.vx; 
    player.y += player.vy; 
    player.vy += gravity; 

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
        player.onGround = true;
    }

    if (!showStageMessage) {
        // Lógica de spawn de Obstáculos (CLT)
        // Spawna um novo obstáculo em intervalos regulares (baseado na obstacleSpawnRate)
        if (frame % Math.floor(60 / obstacleSpawnRate) === 0) {
            spawnObstacle();
        }

        // Lógica de spawn de Shield (Invulnerabilidade)
        // Spawna um escudo em um intervalo de 20 segundos se não houver um escudo ativo
        const SHIELD_SPAWN_INTERVAL = 20 * 60; // 20 segundos
        if (frame % SHIELD_SPAWN_INTERVAL === 0 && !isShieldActive) {
            spawnShield();
        }

        // Lógica de spawn de Bonezin (NOVO: item coletável de pontuação)
        // Spawna um bonezin em um intervalo de 15 segundos
        const BONEZIN_SPAWN_INTERVAL = 13 * 60; // 13 segundos
        if (frame - lastBonezinSpawnFrame >= BONEZIN_SPAWN_INTERVAL) {
            spawnBonezin();
            lastBonezinSpawnFrame = frame; // Atualiza o último frame de spawn
        }

        // Lógica de spawn de Slowdown (Absolute Cinema) baseada em tempo e probabilidade
        // Garante que o item de slowdown apareça em momentos chave e depois por probabilidade
        if (!firstSlowdownGiven && frame >= initialDelay) {
            spawnSlowdown();
            firstSlowdownGiven = true;
            lastSlowdownTime = frame;
        } else if (!secondSlowdownGiven && frame >= initialDelay + cooldown) {
            spawnSlowdown();
            secondSlowdownGiven = true;
            lastSlowdownTime = frame;
            currentProbWindowStart = frame; // Reinicia a janela de probabilidade
            slowdownGivenInThisWindow = false; // Permite um novo slowdown na nova janela
        } else {
            // Se já passou do tempo inicial, tenta spawnar por probabilidade
            if (frame >= currentProbWindowStart + probPeriod) {
                currentProbWindowStart = frame; // Avança a janela de probabilidade
                slowdownGivenInThisWindow = false; // Permite um novo slowdown na nova janela
            }
            if (!slowdownGivenInThisWindow && frame >= currentProbWindowStart) {
                if (Math.random() < slowdownChance) {
                    spawnSlowdown();
                    slowdownGivenInThisWindow = true;
                    lastSlowdownTime = frame;
                }
            }
        }

        // Atualização da taxa de spawn e velocidade dos obstáculos
        // Aumenta a dificuldade do jogo gradualmente
        obstacleSpawnRate = 2 + 0.05 * Math.sqrt(frame / 180); // Aumenta a taxa de spawn
        obstacleSpeed = Math.max(1 * currentScale, (baseSpeed + 0.4 * Math.sqrt(frame / 60)) * currentScale); // Aumenta a velocidade e escala

        // Iterar sobre Obstacles (CLT)
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.y += obstacleSpeed;
            if (checkCollision(player, o, 0.7)) { 
                if (isShieldActive) { 
                    obstacles.splice(i, 1);
                    scorePopups.push({ x: o.x + o.width / 2, y: o.y, alpha: 1.0, timer: 60, text: "Blocked" });
                } else {
                    gameOver = true;
                    bgMusic.pause();
                    showGameOver(); 
                    return; 
                }
            }
            if (o.y > canvas.height) { 
                obstacles.splice(i, 1);
            }
        }

        // Iterar sobre Slowdown Items (Absolute Cinema): move, verifica colisão e remove
        for (let i = slowdownItems.length - 1; i >= 0; i--) {
            let item = slowdownItems[i];
            item.y += (2 * currentScale); 
            if (checkCollision(player, item, 1)) { 
                obstacleSpeed = Math.max(1 * currentScale, obstacleSpeed * 0.88); /// reduz a velocidade (escalada)
                score += buff_score; // Adiciona pontos
                scorePopups.push({ x: item.x + item.width / 2, y: item.y, alpha: 1.0, timer: 60, text: `+${buff_score}` });
                slowdownItems.splice(i, 1); 
                buffsCollected++; 
                collectSound.play(); 
            }
            if (item.y > canvas.height) { 
                slowdownItems.splice(i, 1);
            }
        }

        // Iterar sobre Shield Items: move, verifica colisão e remove
        for (let i = shieldItems.length - 1; i >= 0; i--) {
            let item = shieldItems[i];
            item.y += (2 * currentScale);

            if (checkCollision(player, item, 1)) { 
                isShieldActive = true; 
                shieldTimer = SHIELD_DURATION; 
                shieldItems.splice(i, 1); 
                shieldSound.play(); 
                scorePopups.push({ x: item.x + item.width / 2, y: item.y, alpha: 1.0, timer: 60, text: "Invulnerable!" });
            }

            if (item.y > canvas.height) { 
                shieldItems.splice(i, 1);
            }
        }

        for (let i = bonezin.length - 1; i >= 0; i--) {
            let item = bonezin[i];
            item.y += (2 * currentScale); 
            if (checkCollision(player, item, 1)) {
                score += 50; 
                scorePopups.push({ x: item.x + item.width / 2, y: item.y, alpha: 1.0, timer: 60, text: '50!' });
                bonezin.splice(i, 1); 
                collectSound2.play(); 
            }

            if (item.y > canvas.height) {
                bonezin.splice(i, 1);
            }
        }
    } 

    if (isShieldActive) {
        shieldTimer--;
        if (shieldTimer <= 0) {
            isShieldActive = false;
        }
    }

    if (showStageMessage) {
        stageMessageTimer--;
        if (stageMessageTimer <= 0) {
            showStageMessage = false;
        }
    }

    if (score >= STAGE_TRANSITION_SCORE && currentStage === 1) {
        currentStage = 2; 
        showStageMessage = true; 
        stageMessageTimer = STAGE_MESSAGE_DURATION; 

        obstacles = [];
        slowdownItems = [];
        isShieldActive = false;
        shieldItems = [];
        bonezin = []; 

        player.x = canvas.width / 4;
        player.y = canvas.height - player.height; // Garante que o player esteja no chão
        player.vy = 0;
        player.vx = 0;
        player.onGround = true;

        villain.x = -(villain.width * currentScale); // Esconde o vilão fora da tela inicial
        villain.y = canvas.height - villain.height; // Garante vilão no chão

        bgMusic.pause();
        bgMusic.currentTime = 0; 
        bgMusicSt2.play().catch(error => {
            console.error("Erro ao iniciar música da Stage 2:", error);
        });
    }
}

//################################################//
//### FUNÇÃO DE ATUALIZAÇÃO PARA A STAGE 2 /########/
//################################################//

function updateStage2() {
    frame++;

    if (keys.left || isLeftTouched) {
        player.vx = -speed; 
    } 
    else if (keys.right || isRightTouched) {
        player.vx = speed; 
    }
    if ((keys.up || keys.space || isJumpTouched) && player.onGround) {
        player.vy = jumpStrength; 
        player.onGround = false; 
        isJumpTouched = false;      
    }

    player.x += player.vx; 
    player.y += player.vy; 
    player.vy += gravity; 

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
        player.onGround = true;
    }

    // Mover o fundo para dar a impressão de corrida contínua 
    if (!showStageMessage) { 
        backgroundSt2X -= (backgroundScrollSpeed + 0.1 * Math.sqrt(frame / 60)) * currentScale; // Escala a velocidade de scroll
        if (backgroundSt2X <= -canvas.width) {
            backgroundSt2X += canvas.width; 
        }
    }

    if (showStageMessage) {
        stageMessageTimer--;
        if (stageMessageTimer <= 0) {
            showStageMessage = false;
        }
    }

    // Só spawna e move obstáculos/vilão se a mensagem não estiver ativa
    if (!showStageMessage) {
        // Spawn de obstáculos com espaçamento controlado
        const lastObstacle = stage2Obstacles[stage2Obstacles.length - 1];
        // Garante que haja um espaço mínimo para o próximo spawn E respeita o intervalo de tempo
        if (frame - lastObstacleSpawnTime >= stage2SpawnInterval) {
            // Verifica se o último obstáculo existente está longe o suficiente
            if (!lastObstacle || (lastObstacle.x + lastObstacle.width + (MIN_GAP * currentScale) < canvas.width)) {
                    spawnStage2Obstacle(); 
                    lastObstacleSpawnTime = frame; // Atualiza o tempo do último spawn
            }
        }
        // Spawn do objeto coletável a cada 20 segundos
        if (frame - lastCollectibleSpawnTime >= STAGE2_COLLECTIBLE_SPAWN_INTERVAL) {
            spawnStage2Collectible();
            lastCollectibleSpawnTime = frame;
        }

        for (let i = stage2Obstacles.length - 1; i >= 0; i--) {
            let o = stage2Obstacles[i];
            o.x -= stage2ObstacleSpeed * currentScale; // Obstáculos se movem para a esquerda (velocidade dos objetos escalada)
            if (checkCollision(player, o, 0.7)) {
                gameOver = true;
                bgMusicSt2.pause();
                showGameOver();
                return;
            }

            // +50 pontos por objeto pulado
            if (!o.scored && o.x + o.width < player.x) {
                o.scored = true;
                score += 50;
                scorePopups.push({ x: player.x + player.width / 2, y: player.y, alpha: 1.0, timer: 60, text: "+50!" });
            }
            if (o.x + o.width < 0) {
                stage2Obstacles.splice(i, 1);
            }
        }

        // COLETÁVEIS:
        for (let i = stage2Collectibles.length - 1; i >= 0; i--) {
            let item = stage2Collectibles[i];
            item.x -= stage2ObstacleSpeed * currentScale; // Movimento escalado

            if (checkCollision(player, item, 1)) {
                stage2Collectibles.splice(i, 1);
                collectSoundSt2.play();

                // Lógica de probabilidade para os pontos
                const rand = Math.random();
                let pointsEarned = 0;
                let popupText = "";

                if (rand < 0.2) { // 1/5 de chance de dar 300 pontos (0.0 a 0.2)
                    pointsEarned = 200;
                    popupText = "+200!";
                } else if (rand < 0.6) { // 2/5 de chance de dar 100 pontos (0.2 a 0.6)
                    pointsEarned = 50;
                    popupText = "+50!";
                } else if (rand < 0.8) { // 1/5 de chance de não dar nada (0.6 a 0.8)
                    pointsEarned = 0;
                    popupText = "Nada :(";
                } else { // 1/5 de chance de perder 100 pontos (0.8 a 1.0)
                    pointsEarned = -100;
                    popupText = "-100! sifudeu";
                }
                score += pointsEarned;
                scorePopups.push({ x: item.x + item.width / 2, y: item.y, alpha: 1.0, timer: 60, text: popupText });
            }

            if (item.x + item.width < 0) {
                stage2Collectibles.splice(i, 1);
            }
        }

        // Movimento do vilão (se o vilão se move)
        // O vilão tenta alcançar o player, mas não se move para fora da tela.
        // Sua velocidade aumenta com o tempo.
        if (villain.x < player.x + (player.width * 0.5) && villain.x < canvas.width - (villain.width * 1.5)) {
             villain.x += (villainSpeed * (frame / 60)) * currentScale; // Velocidade do vilão escalada
        }

        // Colisão do vilão com o player
        if (checkCollision(player, villain, 0.8)) {
            gameOver = true;
            bgMusicSt2.pause();
            showGameOver();
            return;
        }

    } // Fim do if (!showStageMessage) para Stage 2

    // Transição para Stage 3
    if (score >= STAGE2_TRANSITION_SCORE && currentStage === 2) {
        currentStage = 3;
        showStageMessage = true;
        stageMessageTimer = STAGE_MESSAGE_DURATION;

        // Limpa os elementos da Stage 2
        stage2Obstacles = [];
        stage2Collectibles = [];
        villain.x = -villain.width * currentScale; // Esconde o vilão

        // Resetar player para o início da Stage 3
        player.x = canvas.width / 4;
        player.y = canvas.height - player.height; // No chão
        player.vy = 0;
        player.vx = 0;
        player.onGround = true;

        bgMusicSt2.pause();
        bgMusicSt2.currentTime = 0;
        bgMusicSt3.play().catch(error => {
            console.error("Erro ao iniciar música da Stage 3:", error);
        });
    }

} // Fim de updateStage2


// ################################################ //
// ### FUNÇÃO DE ATUALIZAÇÃO PARA A STAGE 3 /########/
// ################################################ //

function updateStage3() {
    frame++;

    if (keys.left || isLeftTouched) {
        player.vx = -speed;
    } else if (keys.right || isRightTouched) {
        player.vx = speed;
    } else {
        player.vx = 0;
    }

    if ((keys.up || keys.space || isJumpTouched) && player.onGround) {
        player.vy = jumpStrength;
        player.onGround = false;
        isJumpTouched = false;
    }

    player.x += player.vx;
    player.y += player.vy;
    player.vy += gravity;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
        player.onGround = true;
    }

    if (showStageMessage) {
        stageMessageTimer--;
        if (stageMessageTimer <= 0) {
            showStageMessage = false;
        }
    }

    // Lógica para Stage 3 (exemplo, adicione seus próprios elementos)
    // Aumenta a pontuação continuamente na Stage 3
    if (!showStageMessage) {
        score += 1;
    }

    // AQUI EU IRIA COLOCAR A LÓGICA DE VITÓRIA SE TIVESSE SIDO PEDIDA.
    // POR ENQUANTO, DEIXO SEM CONDIÇÃO DE FIM DE JOGO NESSA FASE.
}


/////////////////////////////////////////////////
/////////////////// D R A W S ///////////////////
/////////////////////////////////////////////////

// Funções de desenho para o Canvas
function drawPlayer() {
    if (chosenPlayerImage) {
        ctx.drawImage(chosenPlayerImage, player.x, player.y, player.width, player.height);
        if (isShieldActive) {
            ctx.strokeStyle = 'rgba(0, 255, 255, ' + (shieldTimer / SHIELD_DURATION) + ')';
            ctx.lineWidth = 5 * currentScale; 
            ctx.strokeRect(player.x, player.y, player.width, player.height);
        }
    }
}

function drawObstacles() {
    for (let o of obstacles) {
        ctx.drawImage(imgObstacle, o.x, o.y, o.width, o.height);
    }
}

function drawSlowdownItems() {
    for (let item of slowdownItems) {
        ctx.drawImage(imgSlowdown, item.x, item.y, item.width, item.height);
    }
}

function drawShieldItems() {
    for (let item of shieldItems) {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
    }
}

function drawBonezin() {
    for (let item of bonezin) {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
    }
}

function drawVillain() {
    ctx.drawImage(imgVillain, villain.x, villain.y, villain.width, villain.height);
}

function drawStage2Obstacles() {
    for (let o of stage2Obstacles) {
        ctx.drawImage(o.image, o.x, o.y, o.width, o.height);
    }
}

function drawStage2Collectibles() {
    for (let item of stage2Collectibles) {
        ctx.drawImage(imgCollectibleSt2, item.x, item.y, item.width, item.height);
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = `${24 * currentScale}px 'Press Start 2P'`; 
    ctx.textAlign = "left";
    ctx.fillText("SCORE: " + score, 20 * currentScale, 40 * currentScale); 
}

function drawNickname() {
    ctx.fillStyle = "white";
    ctx.font = `${20 * currentScale}px 'Press Start 2P'`; 
    ctx.textAlign = "right";
    ctx.fillText("PLAYER: " + playerNickname, canvas.width - (20 * currentScale), 40 * currentScale); 
}

function drawScorePopups() {
    for (let i = scorePopups.length - 1; i >= 0; i--) {
        let popup = scorePopups[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${popup.alpha})`;
        ctx.font = `${20 * currentScale}px 'Press Start 2P'`; 
        ctx.textAlign = "center";
        ctx.fillText(popup.text, popup.x, popup.y);
        popup.y -= 1 * currentScale; 
        popup.alpha -= 0.015;
        if (popup.alpha <= 0) {
            scorePopups.splice(i, 1);
        }
    }
}

function drawStageTransitionMessage() {
    if (showStageMessage) {
        ctx.save();
        ctx.globalAlpha = stageMessageAlpha;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fundo escuro
        ctx.fillStyle = "white";
        ctx.font = `${40 * currentScale}px 'Press Start 2P'`; 
        ctx.textAlign = "center";
        ctx.fillText(`STAGE ${currentStage}`, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
}


function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(); // Desenha o background da fase atual

    if (currentStage === 1) {
        drawObstacles();
        drawSlowdownItems();
        drawShieldItems();
        drawBonezin();
    } else if (currentStage === 2) {
        drawVillain();
        drawStage2Obstacles();
        drawStage2Collectibles();
    } else if (currentStage === 3) {
        // Desenhos específicos para a Stage 3 aqui
        // Ex: drawST3Platforms();
    }

    drawPlayer();
    drawScore();
    drawNickname();
    drawScorePopups(); 

    // Desenha a mensagem de transição por último para garantir que esteja por cima
    drawStageTransitionMessage();
}


// Loop principal do jogo
function gameLoop() {
    if (gameOver) return;

    if (gameStarted) { // Só atualiza se o jogo começou
        frame++;

        if (currentStage === 1) {
            updateStage1();
        } else if (currentStage === 2) {
            updateStage2();
        } else if (currentStage === 3) {
            updateStage3();
        }

        drawGame(); // Desenha todos os elementos do jogo
    }
    requestAnimationFrame(gameLoop);
}


// TELA DE GAME OVER E RANKING

async function showGameOver() {
    gameOverMusic.play(); // Inicia a música de game over
    hideTopButtons(); // Esconde os botões de informações
    const gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('overlay-screen', 'game-over-screen');

    const gameOverTitle = document.createElement('h1');
    gameOverTitle.textContent = 'GAME OVER!';
    gameOverTitle.classList.add('game-over-title');

    const finalScoreText = document.createElement('p');
    finalScoreText.textContent = `Pontuação Final: ${score}`;
    finalScoreText.classList.add('final-score-text');

    const restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART';
    restartButton.classList.add('game-button', 'restart-button');
    restartButton.addEventListener('click', () => {
        gameOverMusic.pause();
        gameOverMusic.currentTime = 0;
        document.body.removeChild(gameOverScreen);
        // Não chamo initGame() aqui, pois showStartScreen() já fará isso ou você pode ter outra lógica
        showStartScreen(); // Volta para a tela inicial
    });

    gameOverScreen.appendChild(gameOverTitle);
    gameOverScreen.appendChild(finalScoreText);
    gameOverScreen.appendChild(restartButton);

    // Seção de Ranking
    const rankingTitle = document.createElement('h2');
    rankingTitle.textContent = 'RANKING';
    rankingTitle.classList.add('ranking-title');
    gameOverScreen.appendChild(rankingTitle);

    const rankingList = document.createElement('ul');
    rankingList.classList.add('ranking-list');
    gameOverScreen.appendChild(rankingList);

    // Salvar e carregar ranking (supondo que você tem um backend para isso)
    await saveScore(playerNickname, score);
    const topScores = await getRanking();

    if (topScores && topScores.length > 0) {
        topScores.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${entry.nickname}: ${entry.score}`;
            rankingList.appendChild(listItem);
        });
    } else {
        const noScoresItem = document.createElement('li');
        noScoresItem.textContent = "Nenhum ranking disponível.";
        noScoresItem.classList.add('no-scores');
        rankingList.appendChild(noScoresItem);
    }

    document.body.appendChild(gameOverScreen);
}


// Funções de interação com o backend (MongoDB/Vercel)
// Mantenha estas funções ou remova se não estiver usando um backend
async function saveScore(nickname, score) {
    try {
        const response = await fetch('/api/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, score }),
        });
        const data = await response.json();
        if (data.success) {
            console.log('Pontuação salva com sucesso!');
        } else {
            console.error('Erro ao salvar pontuação:', data.message);
        }
    } catch (error) {
        console.error('Erro de rede ao salvar pontuação:', error);
    }
}

async function getRanking() {
    try {
        const response = await fetch('/api/get-ranking');
        const data = await response.json();
        if (data.success) {
            return data.ranking;
        } else {
            console.error('Erro ao obter ranking:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Erro de rede ao obter ranking:', error);
        return [];
    }
}
