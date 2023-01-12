import { action, makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class SnakeStore {
	score: number = 0;

	constructor() {
		makeAutoObservable(this, {
			addScore: action.bound,
		});
	}

	addScore() {
		this.score = this.score + 1;
	}
}

export const snake = new SnakeStore();

export const SnakeContext = createContext<SnakeStore>({} as SnakeStore);

export const useSnake = (): SnakeStore => {
	const snake = useContext(SnakeContext);
	if (!snake) {
		throw new Error("useSnake must be used within a SnakeProvider.");
	}

	return snake;
};
