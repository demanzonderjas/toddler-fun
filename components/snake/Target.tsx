import { observer } from "mobx-react";
import { useEffect } from "react";
import { targetModel } from "../../data/models/snake";
import { useCanvas } from "../../stores/CanvasStore";
import { useSnake } from "../../stores/SnakeStore";
import { TCanvasImage } from "../../typings/canvas";
import { calcRandomPosition, loadImage } from "../../utils/canvas";

export const Target: React.FC = observer(() => {
	const canvas = useCanvas();
	const { score } = useSnake();

	const addModelToCanvas = (model: TCanvasImage) => {
		const snake = canvas.getModel("Snake");
		const position = calcRandomPosition(canvas.canvas!, model, [snake!]);
		canvas.addModel({ ...model, ...position });
	};

	useEffect(() => {
		if (score > 0) {
			const targetIndex = canvas.getModelIndex("Target");
			const target = canvas.models[targetIndex];
			const snake = canvas.getModel("Snake");
			const { x, y } = calcRandomPosition(canvas.canvas!, target, [snake!]);
			canvas.replaceModel({ ...target, x, y }, targetIndex);
		}
	}, [score]);

	useEffect(() => {
		if (canvas.models.length === 1) {
			loadImage(targetModel, addModelToCanvas, 150);
		}
	}, [canvas.models.length]);

	return null;
});
