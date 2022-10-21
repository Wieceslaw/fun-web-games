const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const select = document.querySelector('#color-select')
const button = document.querySelector('#btn')

// function drawRect(x1, y1, x2, y2, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x1, y1, x2, y2)
// }


// drawRect(10, 10, 50, 50, "rgb(200, 0, 0)")


const ball = {
    x: 100,
    y: 100,
    radius: 10,
    color: 'white',
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }


canvas.addEventListener('mousemove', event => {
    x = event.offsetX
    y = event.offsetY
    ball.x = x
    ball.y = y
})

button.addEventListener('click', event => {
	ball.color = select.value
})


function draw() {
    ball.draw()
    window.requestAnimationFrame(draw)
}

draw()