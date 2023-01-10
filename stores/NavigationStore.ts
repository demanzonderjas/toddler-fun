import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext, useContext, useEffect } from "react";
import { TMenuItemID } from "../typings/navigation";

class NavigationStore {
	activeMenuItem: TMenuItemID = TMenuItemID.LettersAndNumbers;

	constructor() {
		makeAutoObservable(this, {
			setActiveMenuItem: action.bound,
		});
	}

	setActiveMenuItem(id: TMenuItemID) {
		this.activeMenuItem = id;
	}
}

export const nav = new NavigationStore();

export const NavigationContext = createContext<NavigationStore>({} as NavigationStore);

export const useNavigation = (): NavigationStore => {
	const nav = useContext(NavigationContext);
	if (!nav) {
		throw new Error("useNavigation must be used within a NavigationProvider.");
	}

	return nav;
};