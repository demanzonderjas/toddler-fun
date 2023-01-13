import { observer } from "mobx-react";
import { useEffect } from "react";
import { snakeModel } from "../../data/models/snake";
import { useCanvas } from "../../stores/CanvasStore";
import { useSnake } from "../../stores/SnakeStore";
import { useKeyboard } from "../../stores/KeyboardStore";
import { TCanvasImage } from "../../typings/canvas";
import { calcCenterBottomPosition, calcNewModelPosition, loadImage } from "../../utils/canvas";
import { calcIsColliding } from "../../utils/snake";
import { isArrowKey } from "../../utils/keyboard";

export const Snake: React.FC = observer(() => {
	const canvas = useCanvas();
	const { activeKey, history } = useKeyboard();
	const { addScore } = useSnake();

	const addModelToCanvas = (model: TCanvasImage) => {
		canvas.clearModels();
		const position = calcCenterBottomPosition(canvas.canvas, { width: model.width, height: model.height });
		canvas.addModel({ ...model, ...position });
	};

	useEffect(() => {
		const modelIndex = canvas.getModelIndex("Snake");
		const snake = canvas.models[modelIndex];
		if (!isArrowKey(activeKey) || modelIndex === -1 || !snake.image) {
			return;
		}

		const snakeInNewPosition = calcNewModelPosition(snake, activeKey, canvas.canvas);
		canvas.replaceModel(snakeInNewPosition, modelIndex);

		const targetIndex = canvas.getModelIndex("Target");
		const target = canvas.models[targetIndex];
		if (calcIsColliding(snakeInNewPosition, target)) {
			addScore();
			canvas.replaceModel(
				{
					...snakeInNewPosition,
					width: snakeInNewPosition.width * 1.05,
					height: snakeInNewPosition.height * 1.05,
				},
				modelIndex
			);
		}
	}, [activeKey, history.length]);

	useEffect(() => {
		canvas.clearModels();
		canvas.clearCanvas();
		loadImage(snakeModel, addModelToCanvas);
	}, []);

	return null;
});
