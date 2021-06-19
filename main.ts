/**
 * 迫りくる銃弾を避けるゲーム
 */
// 左に動く
input.onButtonPressed(Button.A, function () {
    me.change(LedSpriteProperty.X, -1)
})
// 最初からスタート
input.onButtonPressed(Button.AB, function () {
    start()
})
// 右に動く
input.onButtonPressed(Button.B, function () {
    me.change(LedSpriteProperty.X, 1)
})
function start () {
    me = game.createSprite(2, 4)
    count = 0
    speed = 500
}
// 銃弾が迫るスピードを速くする
function Speed () {
    if (count % 5 == 0) {
        speed += -100
    }
}
let tama: game.LedSprite = null
let speed = 0
let count = 0
let me: game.LedSprite = null
start()
// 銃弾が迫ってくる
basic.forever(function () {
    tama = game.createSprite(randint(0, 4), 0)
    basic.pause(speed)
    for (let index = 0; index < 4; index++) {
        tama.change(LedSpriteProperty.Y, 1)
        basic.pause(speed)
    }
    count += 1
    tama.delete()
    Speed()
})
// 銃弾に当たってしまうとゲームオーバーになる。
// 避けたの数で点数が決まり、点数によって表示される表情が変化する。
basic.forever(function () {
    if (me.isTouching(tama)) {
        game.setScore(count)
        if (count < 10) {
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            basic.clearScreen()
        } else if (count > 10) {
            basic.showIcon(IconNames.Happy)
            basic.pause(1000)
            basic.clearScreen()
        } else if (count > 20) {
            basic.showIcon(IconNames.Happy)
            basic.pause(1000)
            basic.clearScreen()
        }
        game.gameOver()
        basic.clearScreen()
    }
})
