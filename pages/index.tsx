import { Canvas } from "../components/Canvas";
import { Frogger } from "../components/frogger/Frogger";
import { LettersAndNumbers } from "../components/letters-numbers/LettersAndNumbers";
import { Menu } from "../components/Menu";
import { canvas, CanvasContext } from "../stores/CanvasStore";
import { keyboard, KeyboardContext } from "../stores/KeyboardStore";
import { nav, NavigationContext } from "../stores/NavigationStore";

export default function Home() {
	return (
		<NavigationContext.Provider value={nav}>
			<KeyboardContext.Provider value={keyboard}>
				<CanvasContext.Provider value={canvas}>
					<Menu />
					<Canvas />
					<LettersAndNumbers />
					<Frogger />
				</CanvasContext.Provider>
			</KeyboardContext.Provider>
		</NavigationContext.Provider>
	);
}
