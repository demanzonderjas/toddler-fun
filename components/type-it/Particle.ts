export default class Particle {
	x: number = 0;
	y: number = 0;
	radius: number = 0;
	vx: number = 0;
	vy: number = 0;
	alpha: number = 0;
	color: string = "#FFFFFF";
	COLORS: string[] = [];

	constructor() {
		this.x = 0;
		this.y = 0;
		this.radius = 0;
		this.vx = 0;
		this.vy = 0;
		this.alpha = 0;
		this.color = "#FFFFFF";
		this.COLORS = [
			"rgb(240, 65, 143)",
			"rgb(54, 181, 75)",
			"rgb(78, 118, 194)",
			"rgb(230, 25, 63)",
			"rgb(245, 138, 32);",
		];

		this.reset();
	}

	reset() {
		this.x = this.randBetween(0, window.innerWidth);
		this.y = this.randBetween(0, -window.innerHeight);
		this.vx = this.randBetween(-1.5, 1.5);
		this.vy = this.randBetween(2, 4);
		this.radius = this.randBetween(1, 4);
		this.alpha = this.randBetween(0.5, 0.9);
		const colorIdx = this.randBetween(0, this.COLORS.length) | 0;
		this.color = this.COLORS[colorIdx];
	}

	randBetween(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.y + this.radius > window.innerHeight) {
			this.reset();
		}
	}
}
