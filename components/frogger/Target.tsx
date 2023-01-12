import { observer } from "mobx-react";
import { useEffect } from "react";
import { targetModel } from "../../data/models/frog";
import { useCanvas } from "../../stores/CanvasStore";
import { useFrogger } from "../../stores/FroggerStore";
import { TCanvasImage } from "../../typings/canvas";
import { calcRandomPosition, loadImage } from "../../utils/canvas";

export const Target: React.FC = observer(() => {
	const canvas = useCanvas();
	const { score } = useFrogger();

	const addModelToCanvas = (model: TCanvasImage) => {
		const frog = canvas.getModel("Frog");
		const position = calcRandomPosition(canvas.canvas!, model, [frog!]);
		canvas.addModel({ ...model, ...position });
	};

	useEffect(() => {
		if (score > 0) {
			const targetIndex = canvas.getModelIndex("Target");
			const target = canvas.models[targetIndex];
			const frog = canvas.getModel("Frog");
			const { x, y } = calcRandomPosition(canvas.canvas!, target, [frog!]);
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
