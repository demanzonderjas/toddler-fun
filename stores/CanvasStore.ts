import { action, computed, makeAutoObservable, observable, toJS } from "mobx";
import { createContext, useContext, useEffect } from "react";
import { TCanvasImage, TPosition } from "../typings/canvas";
import { calculateAspectRatioFit, getCenteredPositions } from "../utils/canvas";

class CanvasStore {
	canvas: HTMLCanvasElement | null = null;

	models: TCanvasImage[] = [];

	positions: TPosition[] = [];

	MAX_IMAGE_SIZE_PX: number = 250;

	constructor() {
		makeAutoObservable(this, {
			models: observable,
			ctx: computed,
			addModel: action.bound,
			resize: action.bound,
			clearModels: action.bound,
		});
	}

	get ctx() {
		if (!this.canvas) {
			return null;
		}
		return this.canvas.getContext("2d");
	}

	addModel(model: TCanvasImage) {
		this.models.push(model);
		this.draw();
	}

	draw() {
		if (!this.ctx || !this.models.length) {
			return;
		}
		this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		const positions = getCenteredPositions(this.canvas!, this.models.length, {
			width: this.models[0].width!,
			height: this.models[0].height!,
		});
		this.models.forEach((model, idx) => {
			if (model.image) {
				this.ctx!.drawImage(model.image, positions[idx].x, positions[idx].y, model.width!, model.height!);
			}
		});
	}

	clearCanvas() {
		if (this.ctx) {
			this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		}
	}

	clearModels() {
		this.models = [];
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
