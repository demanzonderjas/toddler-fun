import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { arrowLeftModel, arrowRightModel, arrowUpModel, arrowDownModel } from "../../data/models/frog";
import { useCanvas } from "../../stores/CanvasStore";
import { useFrogger } from "../../stores/FroggerStore";
import { useKeyboard } from "../../stores/KeyboardStore";
import { TCanvasImage } from "../../typings/canvas";
import { loadImage } from "../../utils/canvas";
import { calcArrowsToShow, getArrowPosition } from "../../utils/frogger";

export const ArrowHelp: React.FC = observer(() => {
	const canvas = useCanvas();
	const { history } = useKeyboard();
	const { score } = useFrogger();

	const addModelToCanvas = (model: TCanvasImage) => {
		const frog = canvas.getModel("Frog");
		const target = canvas.getModel("Target");
		const arrowsToShow = calcArrowsToShow(frog!, target!);
		const hasPosition = arrowsToShow[model.name as keyof object];
		const attributes = hasPosition ? getArrowPosition(frog!, model!) : {};
		canvas.addModel({ ...model, ...attributes, hidden: !hasPosition });
	};

	const updateModels = () => {
		const frog = canvas.getModel("Frog");
		const target = canvas.getModel("Target");
		const arrowsToShow = calcArrowsToShow(frog!, target!);
		canvas.arrows.forEach((model: TCanvasImage) => {
			const arrowIndex = canvas.getModelIndex(model.name);
			const hasPosition = arrowsToShow[model.name as keyof object];
			const attributes = hasPosition ? getArrowPosition(frog!, model!) : {};
			canvas.replaceModel({ ...model, ...attributes, hidden: !hasPosition }, arrowIndex);
		});
	};

	useEffect(() => {
		if (score > 0 || !!history.length) {
			updateModels();
		}
	}, [score, history.length]);

	useEffect(() => {
		if (canvas.models.length === 2) {
			const SIZE = 50;
			loadImage(arrowLeftModel, addModelToCanvas, SIZE);
			loadImage(arrowRightModel, addModelToCanvas, SIZE);
			loadImage(arrowUpModel, addModelToCanvas, SIZE);
			loadImage(arrowDownModel, addModelToCanvas, SIZE);
		}
	}, [canvas.models.length]);

	return null;
});
