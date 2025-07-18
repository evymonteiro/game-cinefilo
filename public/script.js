const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
    const gameCanvas = document.getElementById('gameCanvas');
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
const imgObstacle = new Image(); 
const imgSlowdown = new Image(); 
const imgBackground = new Image(); 
const bgMusic = new Audio(); 
const collectSound = new Audio(); 
const buff_score = 150; 
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
const imgSt2 = new Image(); 
const Obstacle2 = [imgSt2, imgObstacle];
const collectSoundSt2 = new Audio(); 
const imgBackgroundSt2 = new Image(); 
const bgMusicSt2 = new Audio();
const imgVillain = new Image();
const imgCollectibleSt2 = new Image();

///STAGE 3: FINAL

const imgBackgroundSt3 = new Image(); 
const bgMusicSt3 = new Audio();       
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
let jumpStrength = -17; // Pulo do player
let speed = 4; // Velocidade de movimento horizontal do player
let villainSpeed = 0.002;
const STAGE3_JUMP_STRENGTH = -20;
let isPaused = false; 


//Stage 1:

let obstacles = [];
let slowdownItems = [];
let shieldItems = []; 
let obstacleSpeed = 3.5; 
let frame = 0;
let score = 0;
let gameOver = false;
let buffsCollected = 0;
let playerNickname = '';
let scorePopups = []; 
let isShieldActive = false; 
let shieldTimer = 0; 
const SHIELD_DURATION = 6 * 60; 
let currentStage = 1;
const STAGE_TRANSITION_SCORE = 3000;
let stageMessageAlpha = 1.0;
const STAGE_MESSAGE_DURATION = 3 * 60; 

//Balanceamento do bonus por probabilidade da stage 1.
let obstacleSpawnRate = 2;
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
const STAGE2_TRANSITION_SCORE = 6000;
const STAGE2_COLLECTIBLE_SPAWN_INTERVAL = 15 * 60;
let lastCollectibleSpawnTime = 0;
let lastObstacleX = canvas.width; 
const MIN_GAP = player.width * 2; // Espaçamento mínimo entre obstáculos (2x o tamanho do player)
const MAX_GAP = canvas.width; // Espaçamento máximo entre obstáculos (aumentado para permitir maiores vazios)
let backgroundSt2X = 0;  // Variável para o deslocamento do fundo da Stage 2

//// STAGE 3 PROPRIEDADES
let backgroundSt3X = 0;
let st3platformsArray = []; 
let lastPlatformSpawnTime = 0; // Tempo do último spawn de plataforma
const ST3_PLATFORM_SPAWN_INTERVAL = 30; // Intervalo de tempo para spawn de plataformas 
let ST3_PLATFORM_SPEED = 2; // Velocidade de movimento das plataformas
const MIN_PLATFORM_GAP = 50; // Espaçamento mínimo entre as plataformas na horizontal
const MAX_PLATFORM_GAP = 250; // Espaçamento máximo entre as plataformas na horizontal
const PLATFORM_HEIGHT_VARIATION = 100; // Variação máxima na altura das plataformas
const INITIAL_PLATFORM_Y = canvas.height - 150; // Posição Y inicial da primeira plataforma
const STAGE3_TRANSITION_SCORE = 12000; // Pontuação para terminar a fase 3 

const PLATFORM_DEFAULT_WIDTH = 150; // Largura padrão para as plataformas
const PLATFORM_DEFAULT_HEIGHT = 60; // Altura padrão para as plataformas
const PLATFORM_WIDTH = 250;
const PLATFORM_HEIGHT = 100; 
let showStageMessage = true; // Definida como true para mostrar a mensagem no início
let stageMessageTimer = 180; // 3 segundos a 60 FPS (180 frames)
const FIXED_SECOND_PLATFORM_OFFSET = 100; 



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
        });

    } else {
        touchControlsContainer.style.display = 'none';
    }
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
//pause

 /////////////////////////////////////////
 //// OBSTÁCULOS E ITENS FASE 1 /////////
 ////////////////////////////////////////

 function spawnObstacle() {
    obstacles.push({
        x: Math.random() * (canvas.width - 60),
        y: 0,
        width: 50,
        height: 50,
    });
}
function spawnSlowdown() {
    slowdownItems.push({
        x: Math.random() * (canvas.width - 60),
        y: 0,
        width: 90,
        height: 90,
    });
}
function spawnShield() {
    shieldItems.push({
        x: Math.random() * (canvas.width - 60),
        y: 0,
        width: 80, 
        height: 80, 
        image: imgShield,
    });
}
function spawnBonezin() {
    const randomImageIndex = Math.floor(Math.random() * bonezin_assets.length);
    const chosenImage = bonezin_assets[randomImageIndex];
    bonezin.push({
        x: Math.random() * (canvas.width - 70), 
        y: -70, 
        width: 80,
        height: 80,
        image: chosenImage
    });
}


///////////////////////////////////////
///// OBSTCÁCULOS E ITENS FASE 2 //////
//////////////////////////////////////

// Spawn de obstáculos para a Stage 2

function spawnStage2Obstacle() {
    const obstacleWidth = 100; // Tamanho fixo para os obstáculos da Stage 2
    const obstacleHeight = 100;
    const groundLevel = canvas.height; 
    const obstacleY = groundLevel - obstacleHeight; 
    // Lógica para espaçamento entre obstáculos
    const lastObstacle = stage2Obstacles[stage2Obstacles.length - 1];
    let newObstacleX = canvas.width; 

    if (lastObstacle) {
        const lastObstacleRight = lastObstacle.x + lastObstacle.width;
        // O randomGap agora pode ser um pouco maior para evitar um "muro"
        const randomGap = Math.random() * (MAX_GAP - MIN_GAP) + MIN_GAP; 
        newObstacleX = lastObstacleRight + randomGap;

        if (newObstacleX < lastObstacleRight + MIN_GAP) {
            newObstacleX = lastObstacleRight + MIN_GAP;
        }
    }
    // Se o novo obstáculo aparecer muito fora da tela (longe demais), ajusta para mais perto
    if (newObstacleX > canvas.width + MAX_GAP) {
        newObstacleX = canvas.width + Math.random() * (MAX_GAP / 2); 
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
    const collectibleSize = 90;
    const groundLevel = canvas.height;
    const collectibleY = groundLevel - collectibleSize - (Math.random() * 100); // Perto do chão, com variação

    stage2Collectibles.push({
        x: canvas.width,
        y: collectibleY,
        width: collectibleSize,
        height: collectibleSize
    });
}


//////////////////////////////////
/////FUNÇÕES STAGE 3////////////
////////////////////////////////

function spawnStage3Platform() {
    // Escolhe uma imagem aleatória da lista de plataformas
    const platformImage = st3platforms[Math.floor(Math.random() * st3platforms.length)];

    // Define as dimensões da plataforma usando as CONSTANTES GLOBAIS.
    const platformWidth = PLATFORM_WIDTH;
    const platformHeight = PLATFORM_HEIGHT;

    // Define uma altura aleatória para a plataforma, baseada na variação
    const randomYOffset = (Math.random() * PLATFORM_HEIGHT_VARIATION) - (PLATFORM_HEIGHT_VARIATION / 2);
    let platformY = INITIAL_PLATFORM_Y + randomYOffset;

    // Garante que a plataforma não seja gerada muito perto do topo ou do chão
    platformY = Math.max(canvas.height / 3, platformY); // Mínimo de 1/3 da altura do canvas
    platformY = Math.min(canvas.height - player.height - platformHeight - 20, platformY); // Máximo, para evitar que fique muito perto do "fundo falso"

    // Posição X inicial da plataforma, começando fora da tela à direita, com espaçamento aleatório
    const platformX = canvas.width + Math.random() * (MAX_PLATFORM_GAP - MIN_PLATFORM_GAP) + MIN_PLATFORM_GAP;

    st3platformsArray.push({
        image: platformImage,
        x: platformX,
        y: platformY,
        width: platformWidth, 
        height: platformHeight, 
        onScreen: true, // Para rastrear se ainda está na tela
        scored: false // Para pontuação (se for o caso)
    });
}

function spawnInitialPlatform() {
    // Pegue a primeira imagem de plataforma para as plataformas fixas iniciais
    const platformImage = st3platforms[0]; 
    
    // Posição da primeira plataforma fixa
    const initialPlatformX = canvas.width / 4 - PLATFORM_WIDTH / 2; // Centraliza sob o player inicial
    const initialPlatformY = INITIAL_PLATFORM_Y; // Altura base

    st3platformsArray.push({
        image: platformImage,
        x: initialPlatformX,
        y: initialPlatformY,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
        onScreen: true,
        scored: false,
        isFixed: true, // Esta plataforma é fixa
        hasSpawnedNext: false // Para controlar o spawn da primeira plataforma rolante (a 3ª no total)
    });

    // Posição da SEGUNDA plataforma fixa inicial, afastada da primeira

    const initialPlatform2X = initialPlatformX + PLATFORM_WIDTH + FIXED_SECOND_PLATFORM_OFFSET;
    const initialPlatform2Y = INITIAL_PLATFORM_Y; // Pode ser a mesma altura ou variar um pouco

    st3platformsArray.push({
        image: platformImage,
        x: initialPlatform2X,
        y: initialPlatform2Y,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
        onScreen: true,
        scored: false,
        isFixed: true, // Esta plataforma também é fixa
        hasSpawnedNext: false // Para controlar o spawn da primeira plataforma rolante
    });

    // Coloca o player em cima da primeira plataforma
    player.x = initialPlatformX + PLATFORM_WIDTH / 2 - player.width / 2;
    player.y = initialPlatformY - player.height;
    player.onGround = true;
    player.vy = 0; // Garante que o player não esteja caindo ao iniciar

    console.log("DEBUG: Duas plataformas iniciais (fixas) configuradas. Primeira em X:", initialPlatformX, "Segunda em X:", initialPlatform2X);
}
/////////////////////////////////////
//////// FUNÇÃO GLOBAL - HITBOX /////
/////////////////////////////////////


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
        obstacleSpeed = Math.max(2, baseSpeed + 0.5 * Math.sqrt(frame / 60)); // Aumenta a velocidade

        // Iterar sobre Obstacles (CLT)
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.y += obstacleSpeed;
            if (checkCollision(player, o, 0.6)) { 
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
            item.y += 2; 
            if (checkCollision(player, item, 1)) { 
                obstacleSpeed = Math.max(1, obstacleSpeed * 0.91); /// reduz a velocidade
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
            item.y += 2;

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
            item.y += 2; 
            if (checkCollision(player, item, 1)) {
                score += 85; 
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
        player.vy = 0;
        player.vx = 0;
        player.onGround = true;

        villain.x = -villain.width;
        villain.y = canvas.height - villain.height;

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
    // Mover o fundo para dar a impressão de corrida contínua 

    if (!showStageMessage) { 
        backgroundSt2X -= backgroundScrollSpeed + 0.1 * Math.sqrt(frame / 60);;
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
            if (!lastObstacle || (lastObstacle.x + lastObstacle.width + MIN_GAP < canvas.width)) {
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
            o.x -= stage2ObstacleSpeed; // Obstáculos se movem para a esquerda (velocidade dos objetos)
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
            item.x -= stage2ObstacleSpeed;

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
                score = Math.max(0, score); // Garante que a pontuação não seja negativa
                scorePopups.push({ x: item.x + item.width / 2, y: item.y, alpha: 1.0, timer: 60, text: popupText });
            }
            // Remove o item se ele sair da tela
            if (item.x + item.width < 0) {
                stage2Collectibles.splice(i, 1);
            }
        }


    ///////////////////// VILLAIN /////////////////////// 

        villain.y = canvas.height - villain.height; 
        villain.x += villainSpeed + 0.006 * Math.sqrt(frame / 60);
        
        // Garante que não saia da tela pela direita
        if (villain.x > canvas.width) {
            villain.x = -villain.width; 
            villain.y = canvas.height - villain.height;
        }
        if (villain.x + villain.width < 0) villain.x = -villain.width;

        if (checkCollision(player, villain, 0.9)) {
            gameOver = true;
            bgMusicSt2.pause();
            showGameOver();
            return;
        }
    }

     /// Transição de fase

    if (score >= STAGE2_TRANSITION_SCORE && currentStage === 2) {
        currentStage = 3;
        showStageMessage = true;
        stageMessageTimer = STAGE_MESSAGE_DURATION; 
        obstacles = [];
        slowdownItems = [];

        player.x = canvas.width / 4; 
        player.vy = 0;
        player.vx = 0; 
        player.onGround = true;

        bgMusicSt2.pause();
        bgMusic.currentTime = 0;
        bgMusicSt3.play().catch(error => {
            console.error("Erro ao iniciar música da Stage 3:", error);
        });
    }
}

// ###########################################//
// ### FUNÇÃO DE ATUALIZAÇÃO PARA A STAGE 3 /########/
// ################################################// 

function updateStage3() {
    // 1. Aplica a velocidade horizontal do player baseada no input
    if (keys.left || isLeftTouched) {
        player.vx = -speed;
    } else if (keys.right || isRightTouched) {
        player.vx = speed;
    } else {
        player.vx = 0; // Para o jogador se nenhuma tecla de movimento horizontal for pressionada
    }

    // 2. Aplica as velocidades ao player (horizontal e vertical)
    player.x += player.vx;
    player.y += player.vy;

    // 3. Aplica a gravidade (faz o player cair)
    player.vy += gravity;

    // 4. Limita o jogador às bordas da tela horizontalmente (ainda é importante)
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // 5. Lógica de pulo
    if ((keys.up || keys.space || isJumpTouched) && player.onGround) {
        player.vy = STAGE3_JUMP_STRENGTH;
        player.onGround = false;
        isJumpTouched = false;
        // Toca o som de pulo aqui se houver
        // jumpSound.play();
    }


    // Mover o fundo para dar a impressão de corrida contínua 

    if (!showStageMessage) { 
        backgroundSt3X  -= backgroundScrollSpeed + 0.1 * Math.sqrt(frame / 60);;
        if (backgroundSt3X  <= -canvas.width) {
            backgroundSt3X  += canvas.width; 
        }
    }

    // Gerenciamento da mensagem de transição da Stage 3
    if (showStageMessage) { 
        stageMessageTimer--; 
        if (stageMessageTimer <= 0) {
            showStageMessage = false; 
            // Spawna a primeira plataforma para o jogador começar em cima dela
            if (st3platformsArray.length === 0) {
                spawnInitialPlatform(); // Função auxiliar para a primeira plataforma
                console.log("DEBUG: Plataforma inicial spawnada!");
            }
        }
    }

    // Lógica das plataformas (spawn, movimento, colisão)
    // Este bloco só deve rodar DEPOIS que a mensagem some.
    if (!showStageMessage) {
        // Obter a última plataforma, se existir
        const lastPlatform = st3platformsArray[st3platformsArray.length - 1];

        // --- LÓGICA DE SPAWN DA PRIMEIRA PLATAFORMA DINÂMICA (A SEGUNDA NO JOGO) ---
        
        if (st3platformsArray.length === 1 && !lastPlatform.hasSpawnedNext && lastPlatform.x + lastPlatform.width < canvas.width * 0.8) {
            // DEBUG: Log da posição da primeira plataforma para verificar
            console.log("DEBUG: Primeira plataforma (inicial) X atual:", lastPlatform.x, "Largura:", lastPlatform.width);

        }
        // Lógica normal de spawn para as plataformas subsequentes (após a segunda)
        // Esta lógica só será ativada quando houver mais de uma plataforma na lista
        // E o tempo de spawn e distância da última plataforma forem adequados.
        else if (st3platformsArray.length > 1 && frame - lastPlatformSpawnTime >= ST3_PLATFORM_SPAWN_INTERVAL) {
            // Verifica se a última plataforma existente está longe o suficiente
            if (lastPlatform && lastPlatform.x + lastPlatform.width + MIN_PLATFORM_GAP < canvas.width + 100) {
                 spawnStage3Platform(); // Chamada normal sem argumento, usará a lógica aleatória
                 lastPlatformSpawnTime = frame;
                 console.log("DEBUG: Plataforma normal spawnada.");
            }
        }

        for (let i = st3platformsArray.length - 1; i >= 0; i--) {
            let platform = st3platformsArray[i];
            platform.x -= ST3_PLATFORM_SPEED; // Plataformas se movem para a esquerda

            // Lógica de colisão do player com a plataforma (apenas por cima)
            if (player.vy >= 0 && // O jogador está caindo
                player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y + player.height <= platform.y + 10 && // Pouca margem acima da plataforma
                player.y + player.height + player.vy >= platform.y) {

                player.y = platform.y - player.height; // Ajusta a posição do jogador para cima da plataforma
                player.vy = 0; // Para a queda
                player.onGround = true; // Considera o jogador "no chão" da plataforma

                // Pontuação por pular em cima de uma plataforma
                if (!platform.scored) {
                    platform.scored = true;
                    score += 100;
                    scorePopups.push({ x: platform.x + platform.width / 2, y: platform.y, alpha: 1.0, timer: 60, text: "+100!" });
                }
            } else if (player.onGround && player.y + player.height > platform.y &&
                       (player.x > platform.x + platform.width || player.x + player.width < platform.x)) {
                // Se o player estava em uma plataforma e saiu dela (caiu para os lados)
                // Isso garante que ele volte a cair se sair da plataforma
                player.onGround = false;
            }

            // REMOÇÃO DA PLATAFORMA: Ajuste esta margem para ela só sumir MUITO DEPOIS de sair da tela
            // Um valor como -1000 significa que ela só é removida quando está 1000 pixels FORA da tela.
            // Isso GARANTE que a plataforma não seja removida antes que a próxima seja spawnada.
            if (platform.x + platform.width < -1000) {
                st3platformsArray.splice(i, 1);
                console.log("DEBUG: Plataforma removida. Total no array:", st3platformsArray.length);
            }
        }

        // Lógica de "game over" se o jogador cair no chão (abaixo de um certo Y)
        if (player.y + player.height > canvas.height + 50) { // Um pouco abaixo da tela para dar margem
            gameOver = true;
            if (bgMusicSt3) bgMusicSt3.pause();
            showGameOver();
            return;
        }

        // Transição para tela de vitória)
        if (score >= STAGE3_TRANSITION_SCORE && currentStage === 3) {
            console.log("DEBUG: Parabéns! Você completou a Fase 3!");
            gameOver = true; // Por enquanto, consideramos game over como vitória para simplificar
            if (bgMusicSt3) bgMusicSt3.pause(); // Garante que a música da Stage 3 pare
            showVictoryScreen(); // Você precisaria criar essa função
            return;
        }
    }
}


//########################################################
//############ // FUNÇÃO UPDATE PRINCIPAL // ################
//#######################################################

function update() {
    if (!gameStarted || gameOver) {
        player.vx = 0;
        return;
    }

    player.vx = 0; // Resetar a velocidade horizontal antes de aplicar o input

    if (currentStage === 1) {
        updateStage1();
        // Lógica de física global para Stage 1
        player.x += player.vx;
        player.y += player.vy;
        player.vy += gravity;

        // Colisão com o chão do canvas para Stage 1
        if (player.y + player.height >= canvas.height) {
            player.y = canvas.height - player.height;
            player.vy = 0;
            player.onGround = true;
        }
        // Limites horizontais para Stage 1
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }

    } else if (currentStage === 2) {
        updateStage2();
        // Lógica de física global para Stage 2
        player.x += player.vx;
        player.y += player.vy;
        player.vy += gravity;

        // Colisão com o chão do canvas para Stage 2
        if (player.y + player.height >= canvas.height) {
            player.y = canvas.height - player.height;
            player.vy = 0;
            player.onGround = true;
        }
        // Limites horizontais para Stage 2
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }

    } else if (currentStage === 3) {
        // Para a Stage 3, a lógica de física do player (movimento, gravidade, colisões, etc.)
        // é totalmente gerenciada DENTRO de updateStage3().
        updateStage3();
    }

    frame++;
}

// MOSTRAR GAME OVER:

async function showGameOver() {
    bgMusic.pause();
    bgMusicSt2.pause();
    bgMusicSt3.pause();
    gameOverMusic.play().catch(error => {
        console.error("Erro ao iniciar música de Game Over:", error);
    });
    const backendUrl = 'https://game-cinefilo.vercel.app/api';
    obstacles = [];
    slowdownItems = [];
    shieldItems = []; 
    stage2Obstacles = [];
    stage2Collectibles = [];
    shieldItems = [];

    if (playerNickname && score > 0) {
        try {
            const response = await fetch(`${backendUrl}/scores`, {
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

    let topScores = [];
    try {
        const response = await fetch(`${backendUrl}/top10`);
        if (response.ok) {
            topScores = await response.json();
        } else {
            console.error('Falha ao buscar as maiores pontuações.');
        }
    } catch (error) {
        console.error('Erro ao buscar as maiores pontuações:', error);
    }

    const gameOverScreen = document.createElement('div');
    gameOverScreen.classList.add('overlay-screen', 'game-over-screen');

    const gameOverText = document.createElement('h1');
    gameOverText.textContent = 'VOCÊ FOI CONTRATADO.';
    gameOverText.classList.add('game-over-title');

    const scoreText = document.createElement('div');
    scoreText.textContent = `Pontuação: ${score}`;
    scoreText.classList.add('final-score-text');

    const rankingTitle = document.createElement('h2');
    rankingTitle.textContent = 'Top 10:';
    rankingTitle.classList.add('ranking-title');

    const rankingList = document.createElement('ul');
    rankingList.classList.add('ranking-list');
    if (topScores.length > 0) {
        topScores.forEach((s, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${s.nickname} - ${s.score}`;
            rankingList.appendChild(listItem);
        });
    } else {
        const noScores = document.createElement('li');
        noScores.textContent = 'Nenhuma pontuação registrada ainda.';
        noScores.classList.add('no-scores');
        rankingList.appendChild(noScores);
    }

    const restartButton = document.createElement('button');
    restartButton.textContent = 'JOGAR NOVAMENTE';
    restartButton.classList.add('game-button', 'restart-button');

    restartButton.addEventListener('click', () => {
        location.reload();
    });
    gameOverScreen.appendChild(gameOverText);
    gameOverScreen.appendChild(scoreText);
    gameOverScreen.appendChild(rankingTitle);
    gameOverScreen.appendChild(rankingList);
    gameOverScreen.appendChild(restartButton);
    document.body.appendChild(gameOverScreen);
}

// Desenho (tudo que é visível no canvas)
function draw() {
    drawBackground();

    if (gameStarted && !gameOver) {
        if (chosenPlayerImage) { 
            ctx.drawImage(chosenPlayerImage, player.x, player.y, player.width, player.height);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }
    shieldItems.forEach(item => {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
    });

        if (isShieldActive) {
    ctx.save(); // Salva o estado atual do contexto do canvas
    ctx.beginPath();

    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2; // Mantemos o escudo centrado no jogador

    const radius = Math.max(player.width, player.height) / 2 + 10; // Raio do escudo

    ctx.arc(playerCenterX, playerCenterY, radius, 0, Math.PI * 2, false);

    ctx.fillStyle = "rgba(255, 255, 0, 0.4)"; // Cor de preenchimento do escudo (amarelo translúcido)
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 0, 0.8)"; // Cor da borda do escudo (amarelo mais forte)
    ctx.lineWidth = 2; // Espessura da borda
    ctx.stroke();

    ctx.restore(); // Restaura o estado anterior do contexto do canvas

    // --- Ajuste da APARÊNCIA e POSIÇÃO da barra de tempo do escudo ---
    const barHeight = 7; // Aumentei a altura da barra para 7 pixels
    const barYPosition = player.y - 20; // Movi a barra para 20 pixels acima do jogador (ajuste conforme necessário)
    const barWidth = player.width; // A largura da barra é a mesma do jogador

    // Fundo da barra (preto, ligeiramente mais opaco)
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(player.x, barYPosition, barWidth, barHeight);

    // Preenchimento da barra (verde, com opacidade total)
    ctx.fillStyle = "rgba(0, 255, 0, 1.0)"; // Opacidade 1.0 (totalmente opaca)
    // A largura do preenchimento diminui com o tempo do escudo
    const currentBarFillWidth = barWidth * (shieldTimer / SHIELD_DURATION);
    ctx.fillRect(player.x, barYPosition, currentBarFillWidth, barHeight);

    // Opcional: Adicionar uma borda fina à barra para destacá-la
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"; // Borda branca sutil
    ctx.lineWidth = 1;
    ctx.strokeRect(player.x, barYPosition, barWidth, barHeight);
}

                ///// STAGE 1 /////
        if (currentStage === 1) {
            for (let o of obstacles) {
                ctx.drawImage(imgObstacle, o.x, o.y, o.width, o.height);
            }
            for (let item of slowdownItems) {
                ctx.drawImage(imgSlowdown, item.x, item.y, item.width, item.height);
            }
             bonezin.forEach(item => {
            if (item.image && item.image.complete) {
            ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
         } else {
            ctx.fillStyle = 'purple'; 
            ctx.fillRect(item.x, item.y, item.width, item.height);
        }
    });
            for (let i = scorePopups.length - 1; i >= 0; i--) {
                let popup = scorePopups[i];
                ctx.save();
                ctx.globalAlpha = popup.alpha;
                ctx.fillStyle = "black";
                ctx.font = "bold 20px 'Press Start 2P'"; 
                ctx.textAlign = "center";
                ctx.fillText(popup.text, popup.x, popup.y); 
                ctx.restore();

                popup.y -= 1; 
                popup.alpha -= 0.02; 
                popup.timer--;

                if (popup.timer <= 0 || popup.alpha <= 0) {
                    scorePopups.splice(i, 1); 
                }
            }

            if (showStageMessage && currentStage === 1) {
                ctx.save();
                ctx.globalAlpha = stageMessageAlpha;
                ctx.fillStyle = "black"; 
                ctx.font = "bold 60px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillText("STAGE 1", canvas.width / 2, canvas.height / 2);
                ctx.restore();

                stageMessageTimer--;
                if (stageMessageTimer > STAGE_MESSAGE_DURATION / 2) {
                    stageMessageAlpha = 1.0; 
                } else {
                    stageMessageAlpha -= 0.01; 
                    if (stageMessageAlpha < 0) {
                        stageMessageAlpha = 0;
                        showStageMessage = false; 
                    }
                }
            }

            ///// STAGE 2 ///////

        } else if (currentStage === 2) {
            for (let o of stage2Obstacles) {
                ctx.drawImage(o.image, o.x, o.y, o.width, o.height); 
            }
            ctx.drawImage(imgVillain, villain.x, villain.y, villain.width, villain.height);
            for (let item of stage2Collectibles) {
                ctx.drawImage(imgCollectibleSt2, item.x, item.y, item.width, item.height);
            }

            for (let i = scorePopups.length - 1; i >= 0; i--) {
                let popup = scorePopups[i];
                ctx.save();
                ctx.globalAlpha = popup.alpha;
                ctx.fillStyle = "black";
                ctx.font = "bold 20px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillText(popup.text, popup.x, popup.y);
                ctx.restore();

                popup.y -= 1;
                popup.alpha -= 0.02;
                popup.timer--;

                if (popup.timer <= 0 || popup.alpha <= 0) {
                    scorePopups.splice(i, 1);
                }
            }

            if (showStageMessage) {
                ctx.save();
                ctx.globalAlpha = stageMessageAlpha;
                ctx.fillStyle = "black";
                ctx.font = "bold 60px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillText("STAGE 2", canvas.width / 2, canvas.height / 2);
                ctx.restore();

                stageMessageTimer--;
                if (stageMessageTimer > STAGE_MESSAGE_DURATION / 2) {
                    stageMessageAlpha = 1.0;
                } else {
                    stageMessageAlpha -= 0.01;
                    if (stageMessageAlpha < 0) {
                        stageMessageAlpha = 0;
                        showStageMessage = false;
                    }
                }
            }
        }
/////////// STAGE 3 //////////////////////////

        else if (currentStage === 3) {
            // Desenha as plataformas da Stage 3
            for (let platform of st3platformsArray) {
                // Verifica se a imagem da plataforma foi carregada antes de desenhar
                if (platform.image && platform.image.complete) {
                    ctx.drawImage(platform.image, platform.x, platform.y, platform.width, platform.height);
                } else {
                    // Fallback: desenha um retângulo se a imagem não estiver carregada
                    ctx.fillStyle = 'gray'; // Cor de placeholder
                    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                }
            }

            // Popups de pontuação para a Stage 3
            for (let i = scorePopups.length - 1; i >= 0; i--) {
                let popup = scorePopups[i];
                ctx.save();
                ctx.globalAlpha = popup.alpha;
                ctx.fillStyle = "black";
                ctx.font = "bold 20px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillText(popup.text, popup.x, popup.y);
                ctx.restore();

                popup.y -= 1;
                popup.alpha -= 0.02;
                popup.timer--;

                if (popup.timer <= 0 || popup.alpha <= 0) {
                    scorePopups.splice(i, 1);
                }
            }

            if (showStageMessage) {
                ctx.save();
                ctx.globalAlpha = stageMessageAlpha;
                ctx.fillStyle = "black";
                ctx.font = "bold 60px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillText("STAGE 3", canvas.width / 2, canvas.height / 2);
                ctx.restore();

                stageMessageTimer--;
                if (stageMessageTimer > STAGE_MESSAGE_DURATION / 2) {
                    stageMessageAlpha = 1.0;
                } else {
                    stageMessageAlpha -= 0.01;
                    if (stageMessageAlpha < 0) {
                        stageMessageAlpha = 0;
                        showStageMessage = false;
                    }
                }
            }
        }
        // Desenha a pontuação e o tempo (sempre visível, independentemente da fase)
        ctx.fillStyle = "black";
        ctx.font = "20px 'Press Start 2P'";
        ctx.fillText("Score: " + score, 20, 40);
        ctx.fillText("Time: " + Math.floor(frame / 60) + "s", 20, 70);
    }
}


// Loop principal do jogo
function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}
