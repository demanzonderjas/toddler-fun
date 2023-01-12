import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { arrowLeftModel, arrowRightModel, arrowUpModel, arrowDownModel } from "../../data/models/snake";
import { useCanvas } from "../../stores/CanvasStore";
import { useSnake } from "../../stores/SnakeStore";
import { useKeyboard } from "../../stores/KeyboardStore";
import { TCanvasImage } from "../../typings/canvas";
import { loadImage } from "../../utils/canvas";
import { calcArrowsToShow, getArrowPosition } from "../../utils/snake";

export const ArrowHelp: React.FC = observer(() => {
	const canvas = useCanvas();
	const { history } = useKeyboard();
	const { score } = useSnake();

	const updateArrowModel = (model: TCanvasImage): TCanvasImage => {
		const snake = canvas.getModel("Snake");
		const target = canvas.getModel("Target");
		const arrowsToShow = calcArrowsToShow(snake, target);
		const hasPosition = arrowsToShow[model.name as keyof object];
		const attributes = hasPosition ? getArrowPosition(snake, model) : {};
		return { ...model, ...attributes, hidden: !hasPosition };
	};

	const addModelToCanvas = (model: TCanvasImage) => {
		const updatedModel = updateArrowModel(model);
		canvas.addModel(updatedModel);
	};

	const updateModels = () => {
		canvas.arrows.forEach((model: TCanvasImage) => {
			const arrowIndex = canvas.getModelIndex(model.name);
			const updatedModel = updateArrowModel(model);
			canvas.replaceModel(updatedModel, arrowIndex);
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
