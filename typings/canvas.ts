export type TCanvasImage = {
	src: string;
	name: string;
	width?: number;
	height?: number;
	image?: HTMLImageElement;
	x?: number;
	y?: number;
	order?: number;
};

export type TDimension = {
	width: number;
	height: number;
};

export type TPosition = {
	x: number;
	y: number;
};
