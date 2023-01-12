import { TCanvasImage, TDimension, TPosition } from "../typings/canvas";
import { calcIsColliding } from "./frogger";

export const getCenteredPositions = (canvas: HTMLCanvasElement, total: number, dimensions: TDimension) => {
	const positions: TPosition[] = [];
	const gapSize = 20;
	const padding = 100;
	const maxItemsPerRow = Math.min(total, ((canvas.width - padding) / (dimensions.width + gapSize)) | 0);
	const totalRows = Math.ceil(total / maxItemsPerRow);
	const startingYPoint = canvas.height / 2 - (totalRows / 2) * (dimensions.height + gapSize / 2) - gapSize / 2;
	const startingXPoint = canvas.width / 2 - maxItemsPerRow * ((dimensions.width + gapSize) / 2) + gapSize / 2;
	let currentColumn = 0;

	for (let i = 0; i < total; i++) {
		let currentRow = Math.floor(i / maxItemsPerRow);
		positions.push({
			x: startingXPoint + currentColumn * dimensions.width + currentColumn * gapSize,
			y: startingYPoint + currentRow * dimensions.height + currentRow * gapSize,
		});
		currentColumn = currentColumn === maxItemsPerRow - 1 ? 0 : currentColumn + 1;
	}

	return positions;
};

export const calculateAspectRatioFit = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {
	const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

	return {
		width: srcWidth * ratio,
		height: srcHeight * ratio,
	};
};

export const loadImage = (model: TCanvasImage, callback: Function, MAX_IMAGE_SIZE_PX = 250) => {
	const image = new Image();
	image.onload = () => {
		const { width, height } = calculateAspectRatioFit(
			image.width,
			image.height,
			MAX_IMAGE_SIZE_PX,
			MAX_IMAGE_SIZE_PX
		);
		callback({ ...model, width, height, image });
	};
	image.src = model.src;
};

export const calcNewModelPosition = (model: TCanvasImage, activeKey: string): TCanvasImage => {
	const MOVE_SPEED = 128;

	if (activeKey === "ArrowLeft") {
		return { ...model, x: model.x! - MOVE_SPEED };
	} else if (activeKey === "ArrowRight") {
		return { ...model, x: model.x! + MOVE_SPEED };
	} else if (activeKey === "ArrowUp") {
		return { ...model, y: model.y! - MOVE_SPEED };
	} else if (activeKey === "ArrowDown") {
		return { ...model, y: model.y! + MOVE_SPEED };
	} else {
		return model;
	}
};

export const calcCenterBottomPosition = (canvas: HTMLCanvasElement, dimensions: TDimension): TPosition => {
	const y = canvas.height - 1.5 * dimensions.height;
	const x = canvas.width / 2 - dimensions.width / 2;
	return { x, y };
};

export const calcRandomPosition = (
	canvas: HTMLCanvasElement,
	model: TCanvasImage,
	exclusions: TCanvasImage[]
): TPosition => {
	const TOP_BARRIER = 160;

	const y = Math.random() * (canvas.height - TOP_BARRIER - model.height!) + TOP_BARRIER;
	const x = Math.random() * (canvas.width - model.width!);

	if (exclusions.some((m) => calcIsColliding(m, { ...model, x, y }))) {
		return calcRandomPosition(canvas, model, exclusions);
	}

	return { x, y };
};
