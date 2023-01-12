import { TCanvasImage, TPosition } from "../typings/canvas";

export function calcIsColliding(model: TCanvasImage, model2: TCanvasImage): boolean {
	const xIsInRange =
		(model.x! > model2.x! && model.x! < model2.x! + model2.width!) ||
		(model.x! + model.width! < model2.x! + model2.width! && model.x! + model.width! > model2.x!) ||
		(model.x! < model2.x! && model.x! + model.width! > model2.x! + model2.width!);
	const yIsInRange =
		(model.y! > model2.y! && model.y! < model2.y! + model2.height!) ||
		(model.y! + model.height! < model2.y! + model2.height! && model.y! + model.height! > model2.y!) ||
		(model.y! < model2.y! && model.y! + model.height! > model2.y! + model2.height!);
	return xIsInRange && yIsInRange;
}

export function calcArrowsToShow(frog: TCanvasImage, target: TCanvasImage) {
	if (!frog) {
		return {
			ArrowLeft: false,
			ArrowRight: false,
			ArrowUp: false,
			ArrowDown: false,
		};
	}
	return {
		ArrowLeft: frog.x! > target.x! + target.width!,
		ArrowRight: frog.x! + frog.width! < target.x!,
		ArrowUp: frog.y! > target.y! + target.height!,
		ArrowDown: frog.y! + frog.height! < target.y!,
	};
}

export function getArrowPosition(frog: TCanvasImage, arrow: TCanvasImage): TPosition {
	if (!frog) {
		return { x: arrow.x!, y: arrow.y! };
	}
	const GAP_SIZE = 5;
	if (arrow.name === "ArrowLeft") {
		return { x: frog.x! - arrow.width! - GAP_SIZE, y: frog.y! + frog.height! / 2 - arrow.height! / 2 };
	} else if (arrow.name === "ArrowRight") {
		return { x: frog.x! + frog.width! + GAP_SIZE, y: frog.y! + frog.height! / 2 - arrow.height! / 2 };
	} else if (arrow.name === "ArrowUp") {
		return { x: frog.x! + frog.width! / 2 - arrow.width! / 2, y: frog.y! - arrow.height! - GAP_SIZE };
	} else if (arrow.name === "ArrowDown") {
		return {
			x: frog.x! + frog.width! / 2 - arrow.width! / 2,
			y: frog.y! + frog.height! + GAP_SIZE,
		};
	}
	return { x: arrow.x!, y: arrow.y! };
}
