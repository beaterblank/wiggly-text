let text;
let font;
let px = 0;
let py = 0;

function preload() {
    // preload OTF font file
    font = loadFont('./Dongle.ttf')
}

class node {
    constructor(x, y, tx, ty) {
        this.pos = createVector(x + tx, y + ty)
        this.cpos = createVector(x + tx, y + ty);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }
    show() {
        point(this.cpos.x, this.cpos.y);
    }
    update() {
        var diff = p5.Vector.sub(this.cpos, this.pos)
            //console.log(diff.mag());
        if (diff.mag() > 10) {
            //diff.setMag(diff.mag())
            this.cpos.sub(diff);
            this.acc = createVector(0, 0);
            this.vel = createVector(0, 0);
        }
        this.cpos.add(this.vel);
        this.vel.add(this.acc);
    }
    attract(target, sl, sh) {
        let cmass = 0.5;
        let G = 60;
        var force = p5.Vector.sub(this.cpos, target);
        if (force.magSq() > sl && force.magSq() < sh) {
            force.setMag(G / (force.magSq()));
        } else {
            force = createVector(0, 0);
        }
        this.acc = force;
    }
}



class graph {
    constructor(string, font, fSize, tx, ty, sp) {
        textSize(fSize)
        let pts = [] // store path data
        this.nodes = [];
        pts = font.textToPoints(string, 0, 0, fSize, {
            sampleFactor: sp, // increase for more points
            simplifyThreshold: 0.0 // increase to remove collinear   points
        })
        for (var i in pts) {
            this.nodes.push(new node(pts[i].x, pts[i].y, tx, ty + fSize / 2))
        }
        this.fSize = fSize
    }
    dostuff() {
        var mx = mouseX;
        var my = mouseY;
        var mouse = createVector(mx, my)
        for (var i in this.nodes) {
            this.nodes[i].attract(mouse, this.fSize / 4, this.fSize * 5);
            this.nodes[i].update();
            this.nodes[i].show();
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    text = new graph("Mohan teja", font, 300, 10, 0, 0.5);
    stroke(255);
    strokeWeight(10);
    noFill();

}

function draw() {
    background(0);
    text.dostuff();
}