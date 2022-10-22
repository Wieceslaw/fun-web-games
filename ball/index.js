const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height


class Ball {
    constructor(name = "ball", x, y, r, color = "blue") {
        this.name = name
        this.x = x
        this.y = y
        this.r = r
        this.color = color

        this.dx = 0
        this.dy = 0
        this.g = 0.5
        this.x_col = false
        this.y_col = false
        this.k = -0.5
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
    }

    move() {
        this.dy += this.g

        this.x += this.dx
        this.y += this.dy
    }

    collide() {
        this.x_col = false
        this.y_col = false
        if (this.x + this.r > width) {
            this.x = width - this.r
            this.x_col = true
        }
        if (this.x - this.r < 0) {
            this.x = this.r
            this.x_col = true
        }
        if (this.y + this.r > height) {
            this.y = height - this.r
            this.y_col = true
            this.dy *= this.k
        }
        if (this.y - this.r < 0) {
            this.y = this.r
            this.y_col = true
            this.dy *= this.k
        }
    }
}


const ball = new Ball("ball1", 50, 50, 20)

// canvas.addEventListener('mousemove', event => {
//     x = event.offsetX
//     y = event.offsetY
//     ball.x = x
//     ball.y = y
// })

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const code = event.code

    if (keyName === 'a') {
        ball.dx = -5
    }
    if (keyName === 'd') {
        ball.dx = 5
    }
    if (code === 'Space' && ball.y_col) {
        ball.dy -= 10
        ball.y_col = false
    }
})

document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        ball.dx = 0
    }
    if (keyName === 'd') {
        ball.dx = 0
    }
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.move()
    ball.collide()
    ball.draw(ctx)
    window.requestAnimationFrame(draw)
}

draw()
