export const createAnimations = (game) => {
  // animaciones
  game.anims.create({
    key: 'mario-walk',
    frames: game.anims.generateFrameNumbers('mario', { start: 3, end: 1 }),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mario-jump',
    frames: [{ key: 'mario', frame: 5 }],
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mario-idle',
    frames: [{ key: 'mario', frame: 0 }],
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mario-die',
    frames: [{ key: 'mario', frame: 4 }],
  })
}