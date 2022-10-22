class Scene {
    constructor(active = false) {
        this.active = active
        this.objects = {
            "platform": null,
            "ball": null,
            "rects": null
        }
    }

    startGame() {
        this.objects.ball.x = this.objects.platform.x + this.objects.platform.w / 2
        this.objects.ball.y = this.objects.platform.y - this.objects.ball.r
    }

    start() {
        this.active = true
    }

    stop() {
        this.active = false
    }
}


class Ball {
    constructor(x, y, r, color = "blue", dx = 0, dy = 0, scene) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color

        this.dx = dx
        this.dy = dy

        this.scene = scene
    }

    draw(ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update(rects, ctx) {
        let collisionObjects = this.collide(rects, ctx) 
        let rect = collisionObjects[0]
        if (rect) {
            this.reflect(rect)
        }
        collisionObjects.forEach(element => {
            if (element instanceof Rectangle) {
                element.hit()
                if (!element.alive()) {
                    element.remove()
                }
            }
        })
        this.x += this.dx
        this.y += this.dy
    }

    reflect(rect) {
        let nearestRectX = Math.max(rect.x, Math.min(this.x, rect.x + rect.w))
        let nearestRectY = Math.max(rect.y, Math.min(this.y, rect.y + rect.h))
        if (nearestRectX == rect.x) {
            this.dx = -1 * Math.abs(this.dx)
        } else if(nearestRectX == rect.x + rect.w) {
            this.dx = Math.abs(this.dx)
        }
        if (nearestRectY == rect.y) {
            this.dy = -1 * Math.abs(this.dy)
        } else if(nearestRectY == rect.y + rect.h) {
            this.dy = Math.abs(this.dy)
        }
    }

    collide(rects) {
        let collisionObjects = []
        for (let rect of rects) {
            if (this.collideWithRect(rect)) {
                collisionObjects.push(rect)
            }
        }
        let collider = this.collideWithBorder()
        if (collider.x) {
            this.dx *= -1
        }
        if (collider.y == -1) {
            this.dy *= -1
        }
        if (collider.y == 1) {
            this.scene.startGame()
        }
        return collisionObjects
    }

    collideWithRect(rect) {
        let nearestRectX = Math.max(rect.x, Math.min(this.x, rect.x + rect.w))
        let nearestRectY = Math.max(rect.y, Math.min(this.y, rect.y + rect.h))
        let deltaX = this.x - nearestRectX
        let deltaY = this.y - nearestRectY
        return (deltaX * deltaX + deltaY * deltaY) < this.r * this.r
    }

    collideWithBorder() {
        let collider = {
            "y": 0,
            "x": 0
        }
        if (this.x + this.r > width) {
            collider.x = 1
        }
        if (this.x - this.r < 0) {
            collider.x = -1
        }
        if (this.y + this.r > height) {
            collider.y = 1
        }
        if (this.y - this.r < 0) {
            collider.y = -1
        }
        return collider
    }
}

class Rectangle {
    constructor(x, y, w, h, color = "blue", maxHitsCount = 1, scene) {
        this.x = x 
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.maxHitsCount = maxHitsCount

        this.hitsCount = 0
    }

    update() {}

    remove() {
        this.x = -1000
        this.y = -1000
    }

    hit() {
        this.hitsCount++
    }

    alive() {
        return this.hitsCount < this.maxHitsCount
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.restore()
    }
}

class Platform {
    constructor(x, y, w, h, color = "blue", scene) {
        this.x = x
        this.y = y 
        this.w = w 
        this.h = h
        this.color = color 

        this.dx = 0
        this.dy = 0
    }

    update() {
        this.x += this.dx
        this.y += this.dy 
        this.collide()
    }

    collide() {
        let collider = this.collideWithBorder()
        if (collider.x == 1) {
            this.x = width - this.w
        }
        if (collider.x == -1) {
            this.x = 0
        }
    }
        
    collideWithBorder() {
        let collider = {
            "y": 0,
            "x": 0
        }
        if (this.x + this.w > width) {
            collider.x = 1
        }
        if (this.x < 0) {
            collider.x = -1
        }
        return collider
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.restore()
    }
}
