window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var particles = [],
    count = 100,
    interval = 250;

var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function particle() {
    this.radius = Math.random() * 4;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * (window.innerHeight);
    this.color = "rgba(255,255,255," + Math.random() + ")";
    this.countdown = interval * Math.random();
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    };
}

for (var i = 0; i < count; i++) {
    particles.push(new particle());
}

function paintCanvas() {
    ctx.fillStyle = "#000";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function draw_particle() {
    paintCanvas();
    for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.draw();
        p.countdown--;
        p.y++;
        if (p.countdown <= 0) {
            particles[j] = new particle();
        }
    };
}

function particle_canvas() {
    draw_particle();
    requestAnimFrame(particle_canvas);
}

particle_canvas();