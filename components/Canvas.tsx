import { useEffect, useRef } from "react";
import { useCanvas } from "../stores/CanvasStore";

export const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = useCanvas();

	useEffect(() => {
		canvas.setCanvas(canvasRef.current);
		canvas.resize();
	}, [canvasRef]);

	return <canvas ref={canvasRef}></canvas>;
};
