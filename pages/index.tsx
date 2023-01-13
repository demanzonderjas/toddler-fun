import { Canvas } from "../components/Canvas";
import { SnakeGame } from "../components/snake/SnakeGame";
import { LettersAndNumbers } from "../components/letters-numbers/LettersAndNumbers";
import { Menu } from "../components/Menu";
import { canvas, CanvasContext } from "../stores/CanvasStore";
import { keyboard, KeyboardContext } from "../stores/KeyboardStore";
import { nav, NavigationContext } from "../stores/NavigationStore";
import { typeIt, TypeItContext } from "../stores/TypeItStore";
import { TypeIt } from "../components/type-it/TypeIt";

export default function Home() {
	return (
		<NavigationContext.Provider value={nav}>
			<KeyboardContext.Provider value={keyboard}>
				<CanvasContext.Provider value={canvas}>
					<Menu />
					<Canvas />
					<LettersAndNumbers />
					<SnakeGame />
					<TypeItContext.Provider value={typeIt}>
						<TypeIt />
					</TypeItContext.Provider>
				</CanvasContext.Provider>
			</KeyboardContext.Provider>
		</NavigationContext.Provider>
	);
}
