const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height


const ball = {
    x: 100,
    y: 100,
    radius: 10,
    color: 'blue',
    dx: 0,
    dy: 0,
    g: 0.5,
    x_col: false,
    y_col: false,
    k: -0.5,
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
    },
    move() {
        this.dy += this.g

        this.x += this.dx
        this.y += this.dy
    },
    collide() {
        this.x_col = false
        this.y_col = false
        if (this.x + this.radius > width) {
            this.x = width - this.radius
            this.x_col = true
            this.dx *= this.k
        }
        if (this.x - this.radius < 0) {
            this.x = this.radius
            this.x_col = true
            this.dx *= this.k
        }
        if (this.y + this.radius > height) {
            this.y = height - this.radius
            this.y_col = true
            this.dy *= this.k
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius
            this.y_col = true
            this.dy *= this.k
        }
        // console.log(this.x_col, this.y_col)
    }
  }


// canvas.addEventListener('mousemove', event => {
//     x = event.offsetX
//     y = event.offsetY
//     ball.x = x
//     ball.y = y
// })

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const code = event.code
  
    // if (keyName === 'w') {
    //     ball.dy = -5
    // }
    // if (keyName === 's') {
    //     ball.dy = 5
    // }
    if (keyName === 'a') {
        ball.dx = -5
    }
    if (keyName === 'd') {
        ball.dx = 5
    }
    if (code === 'Space' && ball.y_col) {
        // console.log('jump', ball.dy)
        ball.dy -= 10
        ball.y_col = false
    }
})

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    // if (keyName === 'w') {
    //     ball.dy = 0
    // }
    // if (keyName === 's') {
    //     ball.dy = 0
    // }
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
    ball.draw()
    window.requestAnimationFrame(draw)
}

draw()
