const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height

const scene = new Scene(true)
const platform = new Platform(canvas.width / 2, canvas.height - 40, 100, 20, "black", scene)
const ball = new Ball(width / 2, canvas.height / 2 + 5, 20, "pink", 2, 6, scene)
const blocks = []
scene.objects["platform"] = platform
scene.objects["ball"] = ball
scene.objects["blocks"] = blocks

const blocksWidthN = 8
const blocksHeightN = 6

const rainbow = ["red", "orange", "yellow", "green", "blue", "purple"]
 
for (let i = 0; i < blocksWidthN; i++) {
    const space = 10
    const heightSpace = 10
    for (let j = 0; j < blocksHeightN; j++) {
        blocks.push(
            new Rectangle(
                space + i * ((width - (space * (blocksWidthN + 1))) / blocksWidthN + space),
                heightSpace + (j * (20 + heightSpace)),
                (width - (space * (blocksWidthN + 1))) / blocksWidthN, 
                20, 
                rainbow[j],
                (blocksHeightN - j),
                scene
            )
        )
    }
}

const rects = [platform].concat(blocks)

function update() {
    platform.update()
    ball.update(rects);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.draw(ctx)
    rects.forEach(element => {
        element.draw(ctx)
    })
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        platform.dx = -10
    }
    if (keyName === 'd') {
        platform.dx = 10
    }
})

document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        platform.dx = 0
    }
    if (keyName === 'd') {
        platform.dx = 0
    }
})

;(() => {
    scene.startGame()
    function main() {
        window.requestAnimationFrame(main);
        if (scene.active) {
            draw();
            update();
        }
    }
    main(); 
})();
