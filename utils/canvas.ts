import { TDimension, TPosition } from "../typings/canvas";

export const getCenteredPositions = (canvas: HTMLCanvasElement, total: number, dimensions: TDimension) => {
	const positions: TPosition[] = [];
	const gapSize = 20;
	const maxItemsPerRow = Math.min(total, (canvas.width / (dimensions.width + gapSize)) | 0);
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
