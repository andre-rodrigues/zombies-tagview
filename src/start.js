function adjustCanvas() {
	views.ctx.canvas.width = window.innerWidth;
	views.ctx.canvas.height = window.innerHeight;
}

window.onresize = adjustCanvas;

adjustCanvas();

var game = new Game(views);