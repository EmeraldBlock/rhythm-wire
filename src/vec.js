export default class Vec {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vec(this.x+v.x,this.y+v.y);
    }
    scale(a,b) {
        b ??= a;
        return new Vec(this.x*a,this.y*b);
    }
    lerp(v,a) {
        return this.scale(1-a).add(v.scale(a));
    }
}
