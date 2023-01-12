import { TCanvasImage, TPosition } from "../typings/canvas";

export function calcIsColliding(model: TCanvasImage, model2: TCanvasImage): boolean {
	const xIsInRange =
		(model.x > model2.x && model.x < model2.x + model2.width) ||
		(model.x + model.width < model2.x + model2.width && model.x + model.width > model2.x) ||
		(model.x < model2.x && model.x + model.width > model2.x + model2.width);
	const yIsInRange =
		(model.y > model2.y && model.y < model2.y + model2.height) ||
		(model.y + model.height < model2.y + model2.height && model.y + model.height > model2.y) ||
		(model.y < model2.y && model.y + model.height > model2.y + model2.height);
	return xIsInRange && yIsInRange;
}

export function calcArrowsToShow(snake: TCanvasImage, target: TCanvasImage) {
	if (!snake) {
		return {
			ArrowLeft: false,
			ArrowRight: false,
			ArrowUp: false,
			ArrowDown: false,
		};
	}
	return {
		ArrowLeft: snake.x > target.x + target.width,
		ArrowRight: snake.x + snake.width < target.x,
		ArrowUp: snake.y > target.y + target.height,
		ArrowDown: snake.y + snake.height < target.y,
	};
}

export function getArrowPosition(snake: TCanvasImage, arrow: TCanvasImage): TPosition {
	if (!snake) {
		return { x: arrow.x, y: arrow.y };
	}
	const GAP_SIZE = 5;
	if (arrow.name === "ArrowLeft") {
		return { x: snake.x - arrow.width - GAP_SIZE, y: snake.y + snake.height / 2 - arrow.height / 2 };
	} else if (arrow.name === "ArrowRight") {
		return { x: snake.x + snake.width + GAP_SIZE, y: snake.y + snake.height / 2 - arrow.height / 2 };
	} else if (arrow.name === "ArrowUp") {
		return { x: snake.x + snake.width / 2 - arrow.width / 2, y: snake.y - arrow.height - GAP_SIZE };
	} else if (arrow.name === "ArrowDown") {
		return {
			x: snake.x + snake.width / 2 - arrow.width / 2,
			y: snake.y + snake.height + GAP_SIZE,
		};
	}
	return { x: arrow.x, y: arrow.y };
}
