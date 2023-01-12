import { action, computed, makeAutoObservable, observable, toJS } from "mobx";
import { createContext, useContext, useEffect } from "react";
import { TCanvasImage, TPosition } from "../typings/canvas";

class CanvasStore {
	canvas: HTMLCanvasElement = null;

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
			replaceModel: action.bound,
			arrows: computed,
		});
	}

	get ctx() {
		if (!this.canvas) {
			return null;
		}
		return this.canvas.getContext("2d");
	}

	get arrows() {
		return this.models.filter((m) => /Arrow(.*)/.test(m.name));
	}

	addModel(model: TCanvasImage) {
		this.models.push(model);
		this.draw();
	}

	getModelIndex(modelName: string) {
		return this.models.findIndex((m) => m.name === modelName);
	}

	getModel(modelName: string) {
		return this.models.find((m) => m.name === modelName);
	}

	replaceModel(model: TCanvasImage, index: number) {
		this.models[index] = model;
		this.draw();
	}

	draw() {
		if (!this.ctx || !this.models.length) {
			return;
		}
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const sorted = this.models.sort((a, b) => b.order - a.order);
		sorted.forEach((model) => {
			if (model.image && !model.hidden) {
				this.ctx.drawImage(model.image, model.x, model.y, model.width, model.height);
			}
		});
	}

	clearCanvas() {
		if (this.ctx) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
