import { action, makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class FroggerStore {
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

export const frogger = new FroggerStore();

export const FroggerContext = createContext<FroggerStore>({} as FroggerStore);

export const useFrogger = (): FroggerStore => {
	const frogger = useContext(FroggerContext);
	if (!frogger) {
		throw new Error("useFrogger must be used within a FroggerProvider.");
	}

	return frogger;
};
