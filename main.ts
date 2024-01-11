enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const heart = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const fire = SpriteKind.create()
}
function initializeAnimations () {
    initializeHeroAnimations()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
sprites.onOverlap(SpriteKind.Sword, SpriteKind.fire, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (JohnnyCage.isHittingTile(CollisionDirection.Bottom)) {
        JohnnyCage.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (JohnnyCage.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            JohnnyCage.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        JohnnyCage.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . . b . 
        . . . . . . . . . . . . . b . . 
        . . . . . . . . . . . . . b . . 
        . . . . . . . . . . . . b . . . 
        . . . . . . . . . . . . b . . . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . . b . . . . . 
        . . . . . . . . b b . . . . . . 
        . . . . . . b b . . . . . . . . 
        b b b b b b . . . . . . . . . . 
        `, JohnnyCage, 100, 0)
    projectile2.setKind(SpriteKind.Sword)
    pause(100)
    sprites.destroy(projectile2)
    animation.runImageAnimation(
    JohnnyCage,
    [img`
        ........................
        ....ffffff..............
        ..ffeeeeeef.............
        .ffeeeeeeeef............
        .feeeeeeeeef...ff.......
        .feeeeeeeeeef.fdf.......
        .feeeeffffeeffddf.......
        fffffffeeefffddf........
        ffeaaeffffffddf.........
        feeadafffdefdf..........
        .fccccdddcdfff..........
        ..ffccccccddf...........
        ...fbbbbcccf............
        ...fbbbbcbf.............
        ...fccccaaf.............
        ....ffffff..............
        .....fff................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        .......fff..............
        ....fffffef.............
        ..ffeeeeeeeff...........
        .ffeeeeeeeeeff..........
        .feeeeeeeeeeef..........
        .ffeeeeeeeeeeef.........
        fffeeeeeeeeeeef.........
        fffffffffeeefff.....ff..
        fafcbbcffffffff...ffdf..
        .fccbaafffdfff..ffddff..
        ..fcccadddddfbbfdddf....
        ...fcccccccaaddfdff.....
        ...feeee55eccddfff......
        ...ffffffffaaaa.........
        ...fff...ff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        .......ff...............
        ....ffffeff.............
        ..ffeeeeeeff............
        .ffeeeeeeeeff...........
        .feeeeeeeeeef...........
        .feeeeeeeeeeef..........
        fffeeeeffffeef..........
        ffffffffcccfff..........
        fbfcbbefffffff..........
        .fccbdbffddff...........
        ..fcccbdddcc.f..........
        ...fbbbbccddafffffff....
        ...fccc55cddafddddd.....
        ...fffffaaaa.fffff......
        ..ffffffff...f..........
        ..fff..ff...............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ....ffffff..............
        ..ffeeeeeef.............
        .ffeeeeeeeef............
        .feeeeeeeeef............
        .feeeeeeeeeef...........
        .feeeeffffeef...........
        fffffffcccfff...........
        ffcbbcfffffff...........
        fccbdbffddff............
        .fcccbddddf.............
        ..fddcbbbcf.............
        ..fddcaafff.............
        ..feee55fdf.............
        ...fbbbbfddf............
        ....ffffffddf...........
        .....fff..fddf..........
        ...........fdf..........
        ............ff..........
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    5000,
    false
    )
})
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(JohnnyCage, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f f f f f f f f f f d e d f . 
        . f d f f f d f f f d d d e f . 
        . f d f f f d f f f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d e e e 5 5 e e e d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(JohnnyCage, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d f f f f f f f f f f . 
        . f e d d d f f f d f f f d f . 
        . . f d d d f f f d f f f d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d e e e 5 5 e e e d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        `)
}
function setLevelTileMap (level: number) {
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    }
    initializeLevel(level)
}
sprites.onOverlap(SpriteKind.fire, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(sprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(JohnnyCage, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d f f f d e d e e f . . . . 
        . f d f f d d d e e e f . . . . 
        . f d f f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b e e d d e e e f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d f f f d e d e e f . . . . 
        . f d f f d d d e e e f . . . . 
        . f d f f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c c a a c b f . . . . 
        . . f c c c c d d c b f . . . . 
        . . f b e e d d d e e f f . . . 
        . . f a a a a a a a a b f f . . 
        . . . f a a b f f a a a f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d f f f d e d e e f . . . . 
        . f d f f d d d e e e f . . . . 
        . f d f f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d f f f d e d e e f . . . . 
        . f d f f d d d e e e f . . . . 
        . f d f f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c a a c c c c b f . . . . 
        . f d d d b c c c c b f . . . . 
        f f f d d e e e e e e f . . . . 
        f f f a a a a a a a b f . . . . 
        . f a a b f a a b f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(JohnnyCage, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d f f f d f . 
        . . . . f e e e d d d f f d f . 
        . . . . f d d d d d d f f d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f e e e d d e e 5 f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d f f f d f . 
        . . . . f e e e d d d f f d f . 
        . . . . f d d d d d d f f d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c a a c c c c f . . 
        . . . . f b c d d c c c c f . . 
        . . . f f e e d d d e e 5 f . . 
        . . f f b a a a a a a a a f . . 
        . . f f a a a f f b a a f . . . 
        . . . f f f f . . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d f f f d f . 
        . . . . f e e e d d d f f d f . 
        . . . . f d d d d d d f f d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f e e e d d e e 5 f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d f f f d f . 
        . . . . f e e e d d d f f d f . 
        . . . . f d d d d d d f f d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c c c a a c f . . 
        . . . . f b c c c c b d d d f . 
        . . . . f e e e e e e d d f f f 
        . . . . f b a a a a a a a f f f 
        . . . . . f f b a a f b a a f . 
        . . . . . . . f f f . f f f . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(JohnnyCage, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f f f f f f f f f f d e d f . 
        . f d f f f d f f f d d d e f . 
        . f d f f f d f f f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d e e e 5 5 e e e d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f f f f f f f f f f d e d f . 
        . f d f f f d f f f d d d e f . 
        . f d f f f d f f f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d d c c c c c c d d d f . . 
        . f d e e e 5 5 e e e d d f . . 
        . . f a a a a a a a a a b f . . 
        . . . f a a b f f a a b f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f e e e e e e e e e e e e f . 
            . f d d d d d d d d d e e d f . 
            . f f f f f f f f f f d e d f . 
            . f d f f f d f f f d d d e f . 
            . f d f f f d f f f d d d f . . 
            . f d d d d d d d d d d d f f . 
            . d a b c c c c c c c c b a d . 
            . d a c c c c c c c c c c a d . 
            . f e e e e 5 5 e e e e e f f . 
            . . f a a a a a a a a a b f . . 
            . . . f a a b f f a a b f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(JohnnyCage, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d f f f f f f f f f f . 
        . f e d d d f f f d f f f d f . 
        . . f d d d f f f d f f f d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d e e e 5 5 e e e d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d f f f f f f f f f f . 
        . f e d d d f f f d f f f d f . 
        . . f d d d f f f d f f f d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . . f d d d c c c c c c d d f . 
        . . f d d e e e 5 5 e e e d f . 
        . . f b a a a a a a a a a f . . 
        . . . f b a a f f b a a f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f e e e e e e e e e e e e f . 
            . f d e e d d d d d d d d d f . 
            . f d e d f f f f f f f f f f . 
            . f e d d d f f f d f f f d f . 
            . . f d d d f f f d f f f d f . 
            . f f d d d d d d d d d d d f . 
            . d a b c c c c c c c c b a d . 
            . d a c c c c c c c c c c a d . 
            . f e e e e e e 5 5 e e e e f . 
            . . f b a a a a a a a a a f . . 
            . . . f b a a f f b a a f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function setHeartPosition () {
    dragon_heart.setPosition(145, 85)
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(JohnnyCage, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f f f f f f f f f f f e d f . 
        . f d f f f d d f f f d d e f . 
        . f d f f f d d f f f d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d c c c c c c c c c d d f . 
        f d d e e e 5 5 e e e e d d f . 
        . f f a a a a a a a a a b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(JohnnyCage, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d f f f f f f f f f f . 
        . f e d d d f f f d f f f d f . 
        . . f d d d f f f d f f f d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . f d d c c c c c c c c c d f . 
        . f d d e e e e 5 5 e e e d d f 
        . . f b a a a a a a a a a f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprites.destroy(sprite)
})
function makeDragonBOSS () {
    dragon = sprites.create(img`
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ..............................cccccccccccccccccccccccccc............................................
        ..............................ccccccccccccccccccccccccccccccc.......................................
        ...................ccccccccccccc55555555555555555555555555ccccc.....................................
        ...................cccccccccccc5555555555555555555555555555555cc....................................
        .................cccc55555555555555555555555555555555555555555ccccc.................................
        ................cccc55555555555555555555555555555555555555555555ccccc...............................
        ...............ccc55555555555555555555555555555555555555555555555cccc...............................
        ...............cc5555555555555555555555555555555555555555555555555cccc..............................
        ..............cc5555555555555555555555555555555555555555555555555555ccc.............................
        ..............cc55555555555555555555555555555555555555555555555555555ccc............................
        ..............c555555555555555555555555555555555555555555555555555555ccc............................
        .............cc5555555555555555555555555555555555555555555555555555555cccc..........................
        .............cc5555555555555555555555555551111111ffffffff555555555555555cccc........................
        ............cc55555555555555555555555555551111111ffffffff5555555555555555cccc.......................
        ............cc55555555555555555555555555551111111ffffffff55555555555555555cccc......................
        ............cc55555555555555555555555555551111111ffffffff555555555555555555ccc......................
        ...........ccc55555555555555555555555555551111111ffffffff5555555555555555555cc......................
        ...........ccc55555555555555555555555555555ffffffffffffff5555555555555555555ccc.....................
        ..........ccc555555555555555555555555555555ffffffffffffff555555555555555555555ccc...................
        ..........ccc555555555555555555555555555555ffffffffffffff5555555555555555555555cc...................
        ...........cc555555555555555555555555555555ffffffffffffff5555555555555555555555cc...................
        ...........cc555555555555555555555555555555ffffffffffffff5555555555555555555555cc...................
        ..........cc5555555555555555555555555555555ffffffffffffff5555555555555555555555cc...................
        ..........cc5555555555555555555555555555555555555555555555555555555555555555555ccc..................
        ..........cc55555555555555555555555555555555555555555555555555555555555555555555cc..................
        ..........cc555555555555555555555555555555555555555555555555555555555555555555555cc.................
        ..........cc555555555555555555555555555555555555555555555555555555555555555555555cc.................
        ..........ccc555555555555555555555555555555555555555555555555555555555555555555555cc................
        ..........ccc555555555555555555555555555555555555555555555555555555555555555555555ccc...............
        ...........cc555555555555555555555555555555555555555555555555555555555555555555555ccc...............
        ...........ccc55555555555555555555555555555555555555555555555555555555555555555555ccc...............
        ............ccccccbbbbbbbbbbbbb111bbbb55555555555555555555555555555555555555555555ccc...............
        .............cccccbbbbbbbbbbbbb111bbbb555555555555555555555555555555555555555555555cc...............
        .............cccccbbbbbbbbbbbbb111bbbb555555555555555555555555555555555555555555555cc...............
        ..............cc5555553333333333333333555555555555555555555555555555555555555555555ccc..............
        ..............cc55555533333333333333335555555555555555555555555555555555555555555555cc..............
        ..............cc55555533333333333333335555555555555555555555555555555555555555ddddddcc..............
        ..............cc55555533333333333333335555555555555555555555555555555555555555ddddddcc..............
        ..............cc55555533333333333333335555555555555555555555555555555555555555ddddddccc.............
        ..............ccc5555533333333333333335555555555555555555555555555555555555555ddddddccc.............
        ................cccc55555555555555555555555555555555555555555555555555555dddddddddddccc.............
        .................ccccc555555555555555555555555555555555555555555555555555ddddddddddddcc.............
        ....................cccc5555555555555555555555555555555555555555555555555ddddddddddddcc.............
        ......................cccc555555555555555555555555555555555555555555dddddddddddddddddccc............
        .......................ccccc5555555555555555555555555555555555555555dddddddddddddddddccc............
        ........................cccccccccccccccccccccc5555555555555555555555dddddddddddddddddccc............
        ..........................cccccccccccccccccccc55555555555bbbbbbddddddddddddddddddddddccc............
        ..........................ccbbbbbbbbbbccc5555555555555555bbbbbbdddddddddddddddddddddddccc...........
        .........................ccbbbbbbbbbbbccc5555555555555555bbbbbbdddddddddddddddddddddddccc...........
        .........................cbbbbbbbbbbbbccc5555555555555555bbbbbbddddddddddddddddddddddddccc..........
        .......................cccbbbbbbbbbbbbccc5555555555555555bbbbbbdddddddddddddddddddddddddcc..........
        ......................cccbbbbbbbbbbcccccc5555555555bbbbbbbbbbbbdddddddddddddddddddddddddccc.........
        .....................ccbbbbbbbbbbbbcccccc5555555555bbbbbbbbbbbbddddddddddddddddddddddddddcccc.......
        ....................ccbbbbbbbbbbbbbcc55555555555555bbbbbbbbbbbbdddddddddddddddddddddddddddccccc.....
        ....................ccbbbbbbbbbbccccc55555555555555bbbbbbbbbbbbddddddddddddddddddddddddddddccccccc..
        ....................cccbbbbbbbbbccccc55555555555555bbbbbbbbbbbbdddddddddddddddddddddddddddddcccccccc
        .....................ccccbbbbbbbccccc55555555555555bbbbbbbbbbbbddddddddddddddddddddddddddddddddddddc
        .......................cccccccccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddddddddddddc
        ........................cccccccccccccddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        ....................................cddddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        .............................cccccccccdddddddddddddcdddddddddddddddddddddddddddddddddddddddddddddddc
        .............................cccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddddddddddc
        .............................cccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddddddddddc
        .............................cccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddddddddddc
        .............................cccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddddddddddc
        .............................cccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddddddddddc
        .............................cccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbddddddddddddddddcc
        .............................cccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbdddddddddddddddccc
        .............................cccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbddddddddddddddcc..
        .............................cccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbddddddddddddcccc..
        .............................cccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbdddddddddddccccc..
        ........................ccccccccccccccdddddddddddddcbbbbbbb55555555555555bbbbbbbbbdddddddddddcccc...
        ........................ccccccccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbddddddddddcccc....
        ........................ccccccccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbdddddddddcccc.....
        ........................ccccccccccccccdddddddddddddcddddddd55555555555555bbbbbbbbbddddddddcccc......
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbddddddccccc.......
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbdddddccccc........
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbddddccccc.........
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbdccccccc..........
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbcccc..............
        ........................ccccccbbbbbbbbbbbbbbbbbbbddcddddddd55555555555555bbbbbbbbbcccc..............
        ........................ccccccbbbbbbbbbbbbbbbbbbbddccdddddd55555555555555bbbbbbbbbcc................
        `, SpriteKind.Enemy)
    dragon.setPosition(150, 50)
    dragon_heart = sprites.create(img`
        ....................
        ....................
        ....................
        ....2222...2222.....
        ...222222.222222....
        ..222222222222222...
        ..222222222222222...
        ..222222222222222...
        ..222222222222222...
        ..222222222222222...
        ..222222222222222...
        ...2222222222222....
        ....22222222222.....
        .....222222222......
        ......2222222.......
        .......22222........
        ........222.........
        .........2..........
        .........2..........
        ....................
        `, SpriteKind.heart)
    setHeartPosition()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(JohnnyCage.isHittingTile(CollisionDirection.Bottom))) {
        JohnnyCage.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.heart, function (sprite, otherSprite) {
    heartHP += -1
    sprites.destroy(sprite)
    if (heartHP == 0) {
        game.gameOver(true)
    }
    otherSprite.image.replace(2, 10)
    pause(200)
    otherSprite.image.replace(10, 2)
})
function createPlayer2 (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.startCountdown(300)
    info.setLife(4)
}
function initializeLevel (level: number) {
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(JohnnyCage, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
}
function hasNextLevel () {
    return currentLevel != levelCount
}
let fire: Sprite = null
let ExtraHealth: Sprite = null
let heroFacingLeft = false
let playerStartLocation: tiles.Location = null
let dragon: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let dragon_heart: Sprite = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let projectile2: Sprite = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let heartHP = 0
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let JohnnyCage: Sprite = null
JohnnyCage = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f f . . . 
    . . f e e e e e e e e e e f . . 
    . f e e e e e e e e e e e e f . 
    . f d e e d d d d d d d d d f . 
    . f d e d f f f f f f f f f f . 
    . f e d d d f f f d f f f d f . 
    . . f d d d f f f d f f f d f . 
    . . f d d d d d d d d d d d f . 
    . . f b a c c c c c c c c a f . 
    . . f d d d c c c c c c d d f . 
    . . f d d e e e 5 5 e e e d f . 
    . . f b a a a a a a a a a f . . 
    . . . f b a a f f b a a f . . . 
    . . . f b a a f f b a a f . . . 
    . . . . f f f . . f f f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(JohnnyCage)
// how long to pause between each contact with a
// single enemy
let invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999966669999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999966666999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999966666999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999966666699999999999dbb999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999996668699999999999dd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999966666999999999999ddb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999999999999999999b968699999999999dddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999999999999999999bb99669999999999dddbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999999999999999999999996b999999999ddbb9999999999999999999999999999999999999999999999999999999999999999999996666bbbbbb99999999999999999999
    999999999999999999999bbb999999999999b9999999999b9999999999dddb9999999999999999999999999999999999999999999999999999999999999999999966666bbebbb9999999999999999999
    99999999999999999999bbbb99999999999bbbbb999999999b9999999991d999999999999999999999999999999999999999999999999999999999999999999999bb66bbbebbb9999999999999999999
    999999999999999999bbbbbbb9999999bddbbbb9999999999b699999999dd999999999999999999999999999999999999999999999999999999999999999999999bbbbbdbeebb9999999999999999999
    99999999999999999bb44444bb99999bbbbbbbbb9999999bdbb99996666bbb6666666688669999999999999999999999999999999999999999999999999999999dbbbbbbbbeeb9999999999999999999
    99999999999999999bb445444b99999bbbbddbbbb999999bbbb66666666b666666668888889999999999999999999999999999999999999999999999999999999bbbbecbbbbcb9999999999999999999
    99999999999999999bbe4544eb99999bbbbbbbbbb99999ddddd11d111dd11111dddddbbbbb99999999999999999999999999999999999999999999999999999999999999999bb9999999999999999999
    999bbbdbbd999999ddbe44eebbb9999bdbbbdbbdd999dd11d1111111111111dd999999bbbcb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9db4eebeebb999999bbbbbbbbbbbbbbccccccbbbb99dd11ddbbddddbbbbbbbb6666666666669999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    bb4eebbb4eeb999999bccccbdddd9dbccccbcccb999911dbbbbddddddddd111111ddd99bb666999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    bbeebbddb4eb999999bccccbbd999bbcccbbcccb9d111dbbd1111111111111111ddddddddbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999
    bdbbbddddbbbbb999bbcccccbb99dbbcccbbccbbdd11dbbdddd111111111111111ddddddddbbbbd999999999999999999999999999999999999999999d99999999999999999999999999999999999999
    1d4bbddbbbbbbbbbbbbbbbbbbbbbbbbcccbbcbbd11ddbbd1ddd1111111111111111ddddddddbbbbd99999999999999999999999999999999999999999d9999999db99999999999999999999999999999
    dbeebbdb4eebbbddddbbbbbbcbbbbbbbbbbbbd111dbbd111ddd11111111111111111ddddddddbbbd999999999999999999999999999999999999999ddbbbbdddddbd9999999999999999999999999999
    ddbeebb4eebbbbbddddbcbbccbdddddddddd111dbbdd1111ddd111111111111111111ddddddddbbbdd9999999999999999999999999999999999999ddddddddddddddddddddd99999999999999999999
    bbbbeebeebdbdbbd99dbcbbccbdbddd111111dbbdd111111ddd1111111111111111111ddddddddbbbdd999999999999999999999999999999999999ddddd1111dddddddddddddd999999999999999999
    bbbdbbbbbbdbdbcbbbdccbbbddddd11111ddbbbd111ddddddddddddddd111111111111dddddddddbbbdd999999999999999999999999999999999999dddddddddddd1111ddddbdddd999999999999999
    ddddddddddbbbbddddddddddd1111111111dddd111dddddbbbbbbbbbbbbbbbbccccccccccccccccccccbd999999999999199999999999999999999911ddddddddbbbbbbbbddddddbbbddd99999999999
    111111111dddddddddddbbbbdddbbbbbbdddddbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbddd99999999999999999999999999999999999999991ddbbbbbbbbbbbbbbbbbbbbbbdddd1d999999
    dddddd111111111111111111111111111111dbbbbbbbbdddddddddddddddddddddddbbbbbbbcbbd19999999999ddd911111199999999999999999111111111bbbbddbbbcebeeccbeebbbbbccccbbdddd
    11111111111111dddddddddddddddd11111dbbbbbbbddddbddddddddddddddbbcbbdbbccbcbbcccfbd1111119999911111111111111111119999111111111dddbbbddbbbbbbbcbbcbcccbbbbbbbbbbbb
    11d111ddbbbbbbbbbbbbbbddddbbbb1111dbcccbbbddbccccfccffffccdddbcfffcbdbcfbccbccbbb11111111111111111111111dddddddd111dddddbbbbbbbdbdddddddddbbbbbbbbbbbbbbbbbbbbbb
    1dbd1ddbbccccccbcccbccbdddbccbd111dc888cbbddcccbefccffffcebbdbcfcfcbdbbccbbbbcbbddd111111dddddddddd1111ddddbbbbbdddddbdddbb66c6dd11ddddddddddddddddbdddddddddddd
    dd1d1dbbccffcccbcccbbcbdddcccdddddbcf88ccbbbcfcbcfccffffebecbbcccccbbdbccbbb6cbccbbddddddddbbbbbbbbd9999919dd99dddbbbbb66666666bd1dd11dddddddddddddddddddddddd11
    dd11dbdbccffcccbcccbbcbdddccbdbbdbbccffcbbbbcfcbfceeffffceebddcbbbccbdbcccbb666ccbdb666b669999966696669999bbb9bbb9b6b999999bbddbdddd11111ddddddddddddddddddddddd
    d1dddbdbccfccbcbcccbbcbdddbcddbddceccccbbbbbbcbbfebeffccbbbbbdecccffcbdbbbbbc6666666666666666666666666699666bb66666b6b6666b999b66bbddd11d1dd1ddddddddddddddddddd
    1d1dbddbccccbbcbccbbbcbdddbd1ddb7ccc6cbbbbbdbbebeebecfcdbbbbbbecfccfcbdbbcbbb66686666666666666669b66666666b6c8888888ccc6bbbbb88886d1ddddd1dddd1ddddddddddd111ddd
    d1dbbddbccccbccbccbbbcbddddd1dbec6cc6cbbdbbbbbcebbbbeccbbbb6cbcccccccbddbbcbb66686b666bbb9999bbbbbccc8888888888ff88cbbbb6888888666bdddddddb3ddddddddddddddd1dddd
    d1dbdddbcccccccbcbbbcccdddd111dc66666cebbbbbeefcbdddeccc69b669bbccbbbdddbbbbb666bbbbbbbbddbbbbbcbbdbbc88888cf886bbbb68888888886666c44444444eeeeee44eebbbb3dddddd
    1dbddddbcccccccbccbbcccddd1111bf66666fcbdddbbcfcbdddbebc669669dddddddddddbbbbbccccddddbddddbbddddddddbc88cbbbbb6888888888888888866bdbbbbbbbbbceeeeeeebbbbbbeee48
    1bdddddbbccccccbccccccbdd1111dbb6666ccbbbdbbdbbeed3bdbdbbbb669ddddddddddddddcbc68cddddddddddddccbcbddd99b666888888888888888886666666666666666666ccccc66666ccccc8
    dbdddddddbbbbbbbbbbbbbddd1111bdb66666cdd7eeedddbebbaebdbebbccbdddddddddddddb6cb88ccbdddddddddbcbb999bb6888888888888868888888686688666666686688888886866666666668
    bddddbdddddddddddddddddd1111dddb6666cbd74eeeddddb33aabdb44e4ebdddddddddddddcccbccfcbdbddd99999bb688888888888888668888f888888666888888666866666668888888888888888
    bddddbddddddddddddddddd11111ddbbbcccbbb74eeebddd333babddbebebeddddddddddddbcbbdb99999bbb668888888886688886668888ff8888888888668888866668666886888886666688866666
    bddddbddddddddddddddddd1111ddbbbbdbbbbbbeebbbddb33bbbbbdbbbbbbb9bbb99999bbbbbbb6888888888886666666666668888fffff888888888888886668888866666686888888668888888888
    bbdddddddddddbddddbddd11dd1ddbbbbdbbdbbbbbbbbbbbbbbbbbbb66666666888666666666666666666666666666666888888ffffffff8888888888888666666666666666666666888888888888888
    bdddddddddddbcbddbcb99bbbbbbbbbbbbbbbbb668888888888888888666666688666666bbb6bbbb6666666666688888888888cffffff888888888888888888688888888668868888886668888688866
    bbbbbbbbbbbbccbbbb8866888888888888888668888866666866bbbc6666686688666666666666668888888888888888888cbbccffffff88888888888888888888888886666666688666668866888886
    888888888886888cca888866666666666666666888888888888cbbbcc8888888888888888866888888888888888888888fcbbbccfffffff888888888cc88888888888886666666666866888888888666
    cccccccccccbccccccccccccccccbbbbbcccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbccccccccccccccccccccccccc66ccccccccccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbdddbbbbbbbbbbbddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbbbbbbddbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbb
    ddbbbbbbbbdddddddbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbddddbbbbbbbbdbbbbbbdddddddbbbbbbbbbbbbbbddddbbbbbbbddbbbbbbbddddbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddbbbbbbbbbddd
    bbbbbdddddddddbbbbbdddddbbddddddddddddddddddbdddddddddbbddddddddbdddddddddbbbbbbbbbddddddddddbddddddddbbddddddddbbddddddddddddddddddbbdddddbbbbbdddddddddbbbbbbb
    bbbbbbbbdbbbbdddddddddbbbbbbbbdbbdddddddddbbbbbbddddbbdddddddddbbbbbbbbbbbddddbbddddbbbbbbbbbdddddddddddbbddddbbbbbbdddddddddbbddbbbbbbbdddddddddbbbbbbbbbbbbbbb
    ddddddddddddddddddddddddbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbdddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddbbbddddddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddddddddddddddddddddddddddd
    ddddbddddddddbddddddddddddddbbbbdbbbbddddbbbbddddbbbbbbbbbbbdddddddddddddbbddddddddbddddddddddddbdbbbbbbbbbbbdddbddddbbbbbbbbbbbbbbdddddddddddddbddddddddbdddddd
    ddddddddddddddddddddddddddddddddddddbbbcccebddddbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbddbbccccbddddddddddddddddddddddddddddddddddddddddd
    dddddddddbdddddddddddddddddddddddddddbbcccbdddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdbbcccbdddddddddddddddddddddddddddddbddddddddddd
    ddddddddddddddddddddddddddbbbddddddddbbbccbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbccbbdddddddddbbbdddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `)
initializeAnimations()
createPlayer2(JohnnyCage)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
makeDragonBOSS()
heartHP = 20
// set up hero animations
game.onUpdate(function () {
    if (JohnnyCage.vx < 0) {
        heroFacingLeft = true
    } else if (JohnnyCage.vx > 0) {
        heroFacingLeft = false
    }
    if (JohnnyCage.isHittingTile(CollisionDirection.Top)) {
        JohnnyCage.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(JohnnyCage, ActionKind.CrouchLeft)
        } else {
            animation.setAction(JohnnyCage, ActionKind.CrouchRight)
        }
    } else if (JohnnyCage.vy < 20 && !(JohnnyCage.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(JohnnyCage, ActionKind.JumpingLeft)
        } else {
            animation.setAction(JohnnyCage, ActionKind.JumpingRight)
        }
    } else if (JohnnyCage.vx < 0) {
        animation.setAction(JohnnyCage, ActionKind.RunningLeft)
    } else if (JohnnyCage.vx > 0) {
        animation.setAction(JohnnyCage, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(JohnnyCage, ActionKind.IdleLeft)
        } else {
            animation.setAction(JohnnyCage, ActionKind.IdleRight)
        }
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (JohnnyCage.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
game.onUpdateInterval(2000, function () {
    if (Math.percentChance(30)) {
        ExtraHealth = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . f f f f f . . 
            . . f f 3 3 3 f f f 3 3 3 f f . 
            . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 3 b b b 3 3 3 f f . 
            . . . f f 3 b b b b b 3 f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        ExtraHealth.setPosition(randint(0, 100), randint(60, 100))
    }
})
game.onUpdateInterval(1500, function () {
    fire = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 3 3 3 3 4 4 4 4 4 4 . . . 
        . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
        . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
        . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
        . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, dragon, -100, randint(10, 100))
    fire.follow(JohnnyCage)
    fire.setKind(SpriteKind.fire)
})
