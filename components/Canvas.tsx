import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { useCanvas } from "../stores/CanvasStore";
import { useNavigation } from "../stores/NavigationStore";

export const Canvas: React.FC = observer(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = useCanvas();
	const { activeMenuItem } = useNavigation();

	useEffect(() => {
		canvas.clearImages();
		canvas.clearCanvas();
	}, [activeMenuItem]);

	useEffect(() => {
		canvas.setCanvas(canvasRef.current);
		canvas.resize();
	}, [canvasRef]);

	return <canvas ref={canvasRef}></canvas>;
});
