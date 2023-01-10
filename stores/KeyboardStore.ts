import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext, useContext, useEffect } from "react";
import { isKeyAlphabetCharacter, isKeyBackspace, isKeyNumber } from "../utils/keyboard";

class KeyboardStore {
	history: string[] = [];

	constructor() {
		makeAutoObservable(this, {
			activeKey: computed,
			history: observable,
			addKeyToHistory: action.bound,
			previousKey: computed,
			overrideNumber: action.bound,
		});
	}

	get activeKey(): string | null {
		if (!this.history.length) {
			return null;
		}
		return this.history[this.history.length - 1];
	}

	get activeLetter(): string {
		const char = this.history.slice().reverse().find(isKeyAlphabetCharacter);
		return char !== undefined ? char : "A";
	}

	get activeNumber(): number {
		const number = this.history.slice().reverse().find(isKeyNumber);
		return number !== undefined ? +number : 0;
	}

	get previousKey() {
		if (this.history.length <= 1) {
			return null;
		}
		return this.history[this.history.length - 2];
	}

	listen() {
		window.addEventListener("keydown", this.addKeyToHistory);
	}

	addKeyToHistory(e: KeyboardEvent) {
		this.history.push(e.key);

		if (isKeyBackspace(e.key)) {
			this.overrideNumber(this.activeNumber);
		}
	}

	overrideNumber(number: number) {
		const numberIdx = this.history.lastIndexOf(number.toString());
		if (numberIdx === -1) {
			return;
		}
		const history = [...this.history];
		history[numberIdx] = ((number || 1) - 1).toString();
		this.history = history;
		console.log(history);
	}

	stopListening() {
		window.removeEventListener("keydown", this.addKeyToHistory);
	}
}

export const keyboard = new KeyboardStore();

export const KeyboardContext = createContext<KeyboardStore>({} as KeyboardStore);

export const useKeyboard = (): KeyboardStore => {
	const keyboard = useContext(KeyboardContext);
	if (!keyboard) {
		throw new Error("useKeyboard must be used within a KeyboardProvider.");
	}

	useEffect(() => {
		keyboard.listen();
		return () => keyboard.stopListening();
	}, [keyboard]);

	return keyboard;
};
