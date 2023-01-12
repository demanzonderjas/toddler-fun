import { observer } from "mobx-react";
import { useEffect } from "react";
import { modelDictionary } from "../../data/models/dictionary";
import { useCanvas } from "../../stores/CanvasStore";
import { useKeyboard } from "../../stores/KeyboardStore";
import { TCanvasImage } from "../../typings/canvas";
import { getCenteredPositions, loadImage } from "../../utils/canvas";

export const Counter: React.FC = observer(() => {
	const { activeLetter, activeNumber } = useKeyboard();
	const canvas = useCanvas();

	const addModelToCanvas = (model: TCanvasImage) => {
		canvas.clearModels();
		const totalToAdd = activeNumber || 1;
		const positions = getCenteredPositions(canvas.canvas, totalToAdd, {
			width: model.width,
			height: model.height,
		});

		for (let i = 0; i < totalToAdd; i++) {
			canvas.addModel({ ...model, x: positions[i].x, y: positions[i].y, order: 0 });
		}
	};

	useEffect(() => {
		if (activeNumber == 0) {
			canvas.clearCanvas();
		} else {
			const activeImage = activeLetter
				? modelDictionary[activeLetter.toUpperCase()]
				: Object.values(modelDictionary)[0];
			loadImage({ ...activeImage, src: `dictionary/${activeImage.src}` }, addModelToCanvas);
		}
	}, [activeNumber, activeLetter]);

	return null;
});
