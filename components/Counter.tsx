import { observer } from "mobx-react";
import { useEffect } from "react";
import { modelDictionary } from "../data/models/dictionary";
import { useCanvas } from "../stores/CanvasStore";
import { useKeyboard } from "../stores/KeyboardStore";

export const Counter: React.FC = observer(() => {
	const { activeLetter, activeNumber } = useKeyboard();
	const canvas = useCanvas();

	useEffect(() => {
		console.log("rerender", activeNumber);
		if (activeNumber == 0) {
			canvas.clearCanvas();
		} else {
			const activeImage = activeLetter
				? modelDictionary[activeLetter.toUpperCase()]
				: Object.values(modelDictionary)[0];
			canvas.clearImages();
			canvas.addImage({ ...activeImage, src: `dictionary/${activeImage.src}` }, activeNumber || 1);
		}
	}, [activeNumber, activeLetter]);

	return null;
});
