import { observer } from "mobx-react";
import { useEffect } from "react";
import { frogModel } from "../../data/models/frog";
import { useCanvas } from "../../stores/CanvasStore";

export const Frog: React.FC = observer(() => {
	const canvas = useCanvas();

	useEffect(() => {
		canvas.clearModels();
		canvas.clearCanvas();
	}, []);

	return null;
});
