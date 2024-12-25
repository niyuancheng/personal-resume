export class CanvasDotSDK {
    private ctx: CanvasRenderingContext2D;
    private dots: {
        x: number;
        y: number;
        speedX: number;
        speedY: number;
    }[] = [];
    private mousePosition: {
        x: number;
        y: number;
    } = {
            x: -1,
            y: -1
        };
    private timer: number = -1;
    private static random(min: number, max: number) {
        return min + Math.random() * (max - min);
    }
    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.canvas.onmouseenter = () => {
            this.canvas.onmousemove = (e) => {
                this.mousePosition.x = e!.offsetX;
                this.mousePosition.y = e!.offsetY;
            }
            this.canvas.onmouseleave = () => {
                this.canvas.onmousemove = null;
                this.mousePosition.x = -1;
                this.mousePosition.y = -1;
            }
        }
        for (let i = 0; i < 100; i++) {
            this.dots.push({
                x: CanvasDotSDK.random(0, this.canvas.width),
                y: CanvasDotSDK.random(0, this.canvas.height),
                speedX: CanvasDotSDK.random(-1, 1),
                speedY: CanvasDotSDK.random(-1, 1),
            })
        }

        window.onresize = () => {
            this.canvas.width = window.innerWidth * window.devicePixelRatio;
            this.canvas.height = window.innerHeight * window.devicePixelRatio;
            this.dots = [];
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < 100; i++) {
                this.dots.push({
                    x: CanvasDotSDK.random(0, this.canvas.width),
                    y: CanvasDotSDK.random(0, this.canvas.height),
                    speedX: CanvasDotSDK.random(-1, 1),
                    speedY: CanvasDotSDK.random(-1, 1),
                })
            }
        }
    }

    start() {
        this.draw();
        this.timer = requestAnimationFrame(() => this.start());
    }

    stop() {
        window.cancelAnimationFrame(this.timer);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = 0; j < this.dots.length; j++) {
                if (i === j) continue;
                const dot1 = this.dots[i]!;
                const dot2 = this.dots[j]!;
                const distance = Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.save();
                    this.ctx.strokeStyle = 'rgba(201, 201, 201, 0.5)';
                    this.ctx.moveTo(dot1.x, dot1.y);
                    this.ctx.lineTo(dot2.x, dot2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                    this.ctx.closePath();
                }
            }
        }

        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.save();
            this.ctx.fillStyle = 'gray';
            this.ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.restore();
            this.ctx.closePath();
            dot.x += dot.speedX;
            dot.y += dot.speedY;
            if (dot.x > this.canvas.width) {
                dot.x = this.canvas.width;
                dot.speedX = -dot.speedX;
            }
            if (dot.x < 0) {
                dot.x = 0;
                dot.speedX = -dot.speedX;
            }
            if (dot.y > this.canvas.height) {
                dot.y = this.canvas.height;
                dot.speedY = -dot.speedY;
            }
            if (dot.y < 0) {
                dot.y = 0;
                dot.speedY = -dot.speedY;
            }
        })

        if (this.mousePosition.x === -1 || this.mousePosition.y === -1) return;
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.fillStyle = 'gray';
        this.ctx.arc(this.mousePosition.x, this.mousePosition.y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.closePath();

        this.dots.forEach(dot => {
            const distance = Math.sqrt(Math.pow(dot.x - this.mousePosition.x, 2) + Math.pow(dot.y - this.mousePosition.y, 2));
            if (distance < 80) {
                this.ctx.beginPath();
                this.ctx.save();
                this.ctx.strokeStyle = 'rgba(201, 201, 201, 0.5)';
                this.ctx.moveTo(dot.x, dot.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.stroke();
                this.ctx.restore();
                this.ctx.closePath();
            }
        })
    }
}