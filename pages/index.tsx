import { ActiveKeyDisplay } from "../components/ActiveKeyDisplay";
import { Canvas } from "../components/Canvas";
import { Counter } from "../components/Counter";
import { canvas, CanvasContext } from "../stores/CanvasStore";
import { keyboard, KeyboardContext } from "../stores/KeyboardStore";

export default function Home() {
	return (
		<KeyboardContext.Provider value={keyboard}>
			<CanvasContext.Provider value={canvas}>
				<ActiveKeyDisplay />
				<Canvas />
				<Counter />
			</CanvasContext.Provider>
		</KeyboardContext.Provider>
	);
}
