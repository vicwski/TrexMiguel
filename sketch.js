var PLAY = 1
var END = 0
var gameState = PLAY

var trex, trex_running, trex_collided
var ground, invisibleGround, groundImage
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var cloudImg
var cloudsGroup, obstaclesGroup
var gameOver, gameOverImg
var restart, restartImg
var checkPointSound, dieSound, jumpSound
var score = 0

function preload() {
  trex_running = loadAnimation(
    'sprites/trex1.png',
    'sprites/trex2.png',
    'sprites/trex3.png'
  )

  trex_collided = loadImage('sprites/trex_collided.png')

  groundImage = loadImage('sprites/ground.png')

  cloudImg = loadImage('sprites/cloud.png')

  obstacle1 = loadImage('sprites/obstacle1.png')
  obstacle2 = loadImage('sprites/obstacle2.png')
  obstacle3 = loadImage('sprites/obstacle3.png')
  obstacle4 = loadImage('sprites/obstacle4.png')
  obstacle5 = loadImage('sprites/obstacle5.png')
  obstacle6 = loadImage('sprites/obstacle6.png')

  gameOverImg = loadImage('sprites/gameOver.png')
  restartImg = loadImage('sprites/restart.png')

  checkPointSound = loadSound('sounds/checkpoint.mp3')
  jumpSound = loadSound('sounds/jump.mp3')
  dieSound = loadSound('sounds/die.mp3')
}

function setup() {
  createCanvas(600, 200)

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50)
  trex.addAnimation('running', trex_running)
  trex.addAnimation('collided', trex_collided)
  trex.scale = 0.5
  //Raio colisor do trex
  // trex.setCollider('rectangle', 0, 0, 250, trex.height)
  trex.setCollider('circle', 0, 0, 40)
  // trex.debug = true

  //crie sprite ground (solo)
  ground = createSprite(200, 180, 400, 20)
  ground.addImage('ground', groundImage)
  ground.x = ground.width / 2

  //crie um solo invisível
  invisibleGround = createSprite(200, 190, 400, 10)
  invisibleGround.visible = false

  //sprite Game Over
  gameOver = createSprite(300, 80)
  gameOver.addImage(gameOverImg)

  //sprite botão de restart
  restart = createSprite(300, 130)
  restart.addImage(restartImg)
  restart.scale = 0.5

  //criar grupos
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
}

function draw() {
  //definir cor do plano de fundo
  background(230)

  if (gameState === PLAY) {
    //pontuação
    score += Math.round(World.frameRate / 60)

    if (score > 0 && score % 600 === 0) {
      checkPointSound.play()
    }

    //invisivilidade das sprites gameOver e restart
    gameOver.visible = false
    restart.visible = false

    ground.velocityX = -(4 + score / 100)

    //Reiniciar o solo
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    // pulando o trex ao pressionar a tecla de espaço
    if (keyDown('space') && trex.y >= 100) {
      trex.velocityY = -10
      jumpSound.play()
    }

    gravity()

    //chamar função de criar as nuvens
    criarNuvens()

    //chamar função de criar os obstaculos
    criarObstacles()

    //condição para alterar o estado do jogo
    if (obstaclesGroup.isTouching(trex)) {
      // trex.velocityY = -10
      // jumpSound.play()
      gameState = END
      dieSound.play()
    }
  } else if (gameState === END) {
    //visivilidade das sprites gameOver e restart
    gameOver.visible = true
    restart.visible = true

    //Tirando a velocidade Y do trex
    trex.velocityY = 0

    //mudar a animação
    trex.changeAnimation('collided')

    //Parando o solo e os grupos de sprite quando o estado do jogo é END
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    //Tempo de vida infinito para os grupos de sprites
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    if (mousePressedOver(restart)) {
      reset()
    }
  }

  //impedir que o trex caia
  trex.collide(invisibleGround)

  drawSprites()

  //texto da pontuação
  stroke(100)
  fill(120)
  text('Score: ' + score, 500, 40)
}

function gravity() {
  trex.velocityY = trex.velocityY + 0.8
}

function reset() {}

function criarNuvens() {
  //frameCount para "atrasar" a criação das sprites de nuvens
  // % (módulo) = resto de uma divisão
  if (frameCount % 60 === 0) {
    var cloud = createSprite(610, 40, 40, 10)
    cloud.addImage(cloudImg)
    cloud.scale = 0.8

    //round: arredonda para o número mais próximo
    //random: número aleatório
    cloud.y = Math.round(random(10, 100))
    cloud.velocityX = -2

    //tempo de vida
    cloud.lifetime = 325

    //profundidade
    cloud.depth = trex.depth
    trex.depth += 1

    //grupo
    cloudsGroup.add(cloud)
  }
}

function criarObstacles() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(610, 160, 10, 60)
    obstacle.scale = 0.7
    obstacle.velocityX = -(4 + score / 100)

    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1)
        break
      case 2:
        obstacle.addImage(obstacle2)
        break
      case 3:
        obstacle.addImage(obstacle3)
        break
      case 4:
        obstacle.addImage(obstacle4)
        break
      case 5:
        obstacle.addImage(obstacle5)
        break
      case 6:
        obstacle.addImage(obstacle6)
        break
      default:
        break
    }

    //tempo de vida
    obstacle.lifetime = 325

    //grupo
    obstaclesGroup.add(obstacle)
  }
}
