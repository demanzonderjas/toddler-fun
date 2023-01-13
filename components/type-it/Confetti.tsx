import { useEffect, useRef } from "react";
import Particle from "./Particle";

export const Confetti: React.FC = () => {
	const confettiRef = useRef(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	let currentAnimation: any;

	const createParticles = () => {
		const totalParticles = window.innerWidth / 4;
		const particles = [];
		for (let p = 0; p < totalParticles; p++) {
			particles.push(new Particle());
		}
		return particles;
	};

	const update = (): void => {
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) {
			currentAnimation = requestAnimationFrame(update);
			return null;
		}
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		for (const particle of particles) {
			particle.update();

			ctx.save();
			ctx.fillStyle = particle.color;
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.globalAlpha = particle.alpha;
			ctx.fill();
			ctx.restore();
		}
		currentAnimation = requestAnimationFrame(update);
	};

	const onResize = () => {
		if (confettiRef.current) {
			canvasRef.current.width = confettiRef.current.clientWidth;
			canvasRef.current.height = confettiRef.current.clientHeight;
		}
	};

	const particles = createParticles();

	useEffect(() => {
		window.addEventListener("resize", onResize);
		if (confettiRef.current) {
			confettiRef.current.addEventListener("resize", onResize);
		}
		onResize();
		currentAnimation = requestAnimationFrame(update);

		return () => {
			window.removeEventListener("resize", onResize);
			window.cancelAnimationFrame(currentAnimation);
		};
	}, []);

	return (
		<div className="Confetti" ref={confettiRef}>
			<canvas ref={canvasRef} />
			<style jsx>{`
				.Confetti {
					width: 100%;
					height: 100%;
					min-height: 30vh;
					max-height: 700px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
				}
				canvas {
					width: 100%;
					height: 100%;
					display: block;
					position: relative;
				}
			`}</style>
		</div>
	);
};
