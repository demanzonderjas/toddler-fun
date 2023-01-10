import { action, computed, makeAutoObservable, observable, toJS } from "mobx";
import { createContext, useContext, useEffect } from "react";
import { TCanvasImage } from "../typings/canvas";
import { calculateAspectRatioFit, getCenteredPositions } from "../utils/canvas";

class CanvasStore {
	canvas: HTMLCanvasElement | null = null;

	models: TCanvasImage[] = [];

	MAX_IMAGE_SIZE_PX: number = 250;

	constructor() {
		makeAutoObservable(this, {
			models: observable,
			ctx: computed,
			addImage: action.bound,
			resize: action.bound,
			clearImages: action.bound,
		});
	}

	get ctx() {
		if (!this.canvas) {
			return null;
		}
		return this.canvas.getContext("2d");
	}

	addImage(model: TCanvasImage, number: number) {
		for (let i = 0; i < number; i++) {
			this.models.push(model);
		}
		this.loadImage(model);
	}

	draw() {
		if (!this.ctx || !this.models.length) {
			return;
		}
		this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		const positions = getCenteredPositions(this.canvas!, this.models.length, {
			width: this.models[0].width,
			height: this.models[0].height,
		});
		this.models.forEach((model, idx) => {
			if (model.image) {
				this.ctx!.drawImage(model.image, positions[idx].x, positions[idx].y, model.width, model.height);
			}
		});
	}

	clearCanvas() {
		if (this.ctx) {
			this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		}
	}

	clearImages() {
		this.models = [];
	}

	loadImage(model: TCanvasImage) {
		const image = new Image();
		image.onload = () => {
			this.models = this.models.map((_model) => {
				const { width, height } = calculateAspectRatioFit(
					image.width,
					image.height,
					this.MAX_IMAGE_SIZE_PX,
					this.MAX_IMAGE_SIZE_PX
				);
				return _model.name === model.name ? { ..._model, image, width, height } : _model;
			});
			this.draw();
		};
		image.src = model.src;
	}

	setCanvas(canvas: HTMLCanvasElement | null) {
		this.canvas = canvas;
	}

	listen() {
		window.addEventListener("resize", this.resize);
	}

	resize() {
		if (!this.canvas) {
			return;
		}
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.draw();
	}

	stopListening() {
		window.removeEventListener("keydown", this.resize);
	}
}

export const canvas = new CanvasStore();

export const CanvasContext = createContext<CanvasStore>({} as CanvasStore);

export const useCanvas = (): CanvasStore => {
	const canvas = useContext(CanvasContext);
	if (!canvas) {
		throw new Error("useCanvas must be used within a CanvasProvider.");
	}

	useEffect(() => {
		canvas.listen();
		return () => canvas.stopListening();
	}, [canvas]);

	return canvas;
};
