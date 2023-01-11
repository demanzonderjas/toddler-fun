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
		const position = calcRandomPosition(canvas.canvas!, { width: model.width!, height: model.height! });
		canvas.addModel({ ...model, ...position });
	};

	useEffect(() => {
		if (score > 0) {
			const targetIndex = canvas.getModelIndex("Target");
			const target = canvas.models[targetIndex];
			const { x, y } = calcRandomPosition(canvas.canvas!, {
				width: target.width!,
				height: target.height!,
			});
			canvas.replaceModel({ ...target, x, y }, targetIndex);
		}
	}, [score]);

	useEffect(() => {
		if (canvas.models.length === 1) {
			loadImage(targetModel, addModelToCanvas);
		}
	}, [canvas.models.length]);

	return null;
});
