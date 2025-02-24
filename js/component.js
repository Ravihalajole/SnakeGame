class Component {
    constructor(x, y, h, w, color, ctx, type = "block") {
        this.x = x
        this.y = y
        this.height = h
        this.width = w
        this.color = color
        this.type = type
        this.ctx = ctx//context
        this.speedX = 0
        this.speedY = 0
        if (this.type == 'image') {
            this.image = new Image()
            this.image.src = color
        }
    }
    draw() {
        this.edges()
        this.updatePosition()
        if (this.type == 'image') {
            this.ctx.shadowColor='#0000005e'
            this.ctx.shadowOffsetX=1
            this.ctx.shadowOffsetY=1
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            this.ctx.fillStyle = this.color
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    updatePosition() {
        this.x += this.speedX
        this.y += this.speedY
    }
    edges() {
        this.top = this.y
        this.bottom = this.y + this.height
        this.right = this.x + this.width
        this.left = this.x
    }

}