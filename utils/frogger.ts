import { TCanvasImage } from "../typings/canvas";

export function calcIsColliding(model: TCanvasImage, model2: TCanvasImage): boolean {
	const xIsInRange =
		(model.x! > model2.x! && model.x! < model2.x! + model2.width!) ||
		(model.x! + model.width! < model2.x! + model2.width! && model.x! + model.width! > model2.x!);
	const yIsInRange =
		(model.y! > model2.y! && model.y! < model2.y! + model2.height!) ||
		(model.y! + model.height! < model2.y! + model2.height! && model.y! + model.height! > model2.y!);
	return xIsInRange && yIsInRange;
}
