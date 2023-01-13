import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { wordListToType } from "../data/typeIt";
import { isKeyAlphabetCharacter, isKeyBackspace } from "../utils/keyboard";

class TypeItStore {
	wordList: string[] = wordListToType;

	activeWordIndex: number = 0;

	activeInput: string = "";

	correctCharsLength: number = 0;

	correctWordIndexes: number[] = [];

	correctDelay: any = null;

	constructor() {
		makeAutoObservable(this, {
			handleLatestInput: action.bound,
			activeWordIndex: observable,
			activeWord: computed,
			correctCharsLength: observable,
			currentChar: computed,
			correctWords: computed,
		});
	}

	get correctWords() {
		return this.correctWordIndexes.map((index) => this.wordList[index]);
	}

	get activeWord() {
		return this.wordList[this.activeWordIndex] || "";
	}

	get currentChar() {
		return this.activeWord[this.correctCharsLength];
	}

	handleLatestInput(activeKey: string) {
		if (!activeKey || this.correctDelay) {
			return;
		}
		if (activeKey == "ArrowLeft") {
			this.activeWordIndex = Math.max(this.activeWordIndex - 1, 0);
		} else if (activeKey == "ArrowRight") {
			this.activeWordIndex = Math.min(this.activeWordIndex + 1, this.wordList.length - 1);
		} else if (isKeyBackspace(activeKey)) {
			this.correctCharsLength = Math.max(this.correctCharsLength - 1, 0);
			this.activeInput = "";
		} else if (activeKey.toUpperCase() === this.currentChar.toUpperCase()) {
			this.correctCharsLength = this.correctCharsLength + 1;
			this.activeInput = "";
			this.checkIfWordCorrect();
		} else if (isKeyAlphabetCharacter(activeKey)) {
			this.activeInput = activeKey;
		}
	}

	checkIfWordCorrect() {
		if (this.activeWord.length !== this.correctCharsLength) {
			return;
		}
		this.correctDelay = setTimeout(() => {
			this.correctCharsLength = 0;
			this.correctWordIndexes.push(this.activeWordIndex);
			this.activeWordIndex = this.activeWordIndex + 1;
			this.correctDelay = null;
		}, 4000);
		this.activeInput = "";
	}
}

export const typeIt = new TypeItStore();

export const TypeItContext = createContext<TypeItStore>({} as TypeItStore);

export const useTypeIt = (): TypeItStore => {
	const typeIt = useContext(TypeItContext);
	if (!typeIt) {
		throw new Error("useTypeIt must be used within a TypeItProvider.");
	}

	return typeIt;
};
