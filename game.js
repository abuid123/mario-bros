import { createAnimations } from "./animations.js";

const config = {
  type: Phaser.AUTO, //primero prueba webgl y luego canvas si no funciona webgl
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload, //funcion que carga los recursos
    create,  //funcion que crea los elementos
    update
  }
};

new Phaser.Game(config);

function preload () { // 1.
  this.load.image(
    'cloud1',
    'assets/scenery/overworld/cloud1.png'
  )

  this.load.image(
    'floorbricks',
    'assets/scenery/overworld/floorbricks.png'
  )

  this.load.spritesheet(
    'mario',
    'assets/entities/mario.png',
    { frameWidth: 18, frameHeight: 16 }
  )

  this.load.audio('gameover', 'assets/sound/music/gameover.mp3')

  this.load.audio('jump', 'assets/sound/effects/jump.mp3')
}

function create () { // 2.
  // image(x, y, id-del-asset)
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15)

  // tileSprite(x, y, width, height, id-del-asset)

  this.floor = this.physics.add.staticGroup()

  this.floor.create(0, config.height, 'floorbricks')
    .setOrigin(0, 1)
    .refreshBody()

  this.floor.create(170, config.height, 'floorbricks')
    .setOrigin(0, 1)
    .refreshBody()

  this.mario = this.physics.add.sprite(50, 210, 'mario')
    .setOrigin(0, 1)
    .setGravityY(500) //añade gravedad no es obligatorio, pero le podes poner gravedad a cada personaje especifico
    .setCollideWorldBounds(true) //no se salga de los bordes del mundo

  // colisiones
  this.physics.add.collider(this.mario, this.floor)

  // camara y bordes del mundo
  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(this.mario)

  createAnimations(this)

  this.keys = this.input.keyboard.createCursorKeys()
}

function update () { // 3. continuamente
  if (this.mario.isDead) return

  if (this.keys.right.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x += 2
    this.mario.flipX = false
  } else if (this.keys.left.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x -= 2
    this.mario.flipX = true
  } else {
    this.mario.anims.play('mario-idle', true)
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-250)
    this.mario.anims.play('mario-jump', true)
    this.sound.add('jump', { volume: 0.2 }).play()
  }

  if (this.mario.y >= config.height) {
    this.mario.isDead = true
    this.mario.anims.play('mario-die', true)
    this.mario.setCollideWorldBounds(false)
    this.sound.add('gameover', { volume: 0.2 }).play()

    setTimeout(() => {
      this.mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 2000)
  }
}