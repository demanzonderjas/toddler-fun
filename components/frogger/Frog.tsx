import { observer } from "mobx-react";
import { useEffect } from "react";
import { frogModel } from "../../data/models/frog";
import { useCanvas } from "../../stores/CanvasStore";
import { useFrogger } from "../../stores/FroggerStore";
import { useKeyboard } from "../../stores/KeyboardStore";
import { TCanvasImage } from "../../typings/canvas";
import { calcCenterBottomPosition, calcNewModelPosition, loadImage } from "../../utils/canvas";
import { calcIsColliding } from "../../utils/frogger";
import { isArrowKey } from "../../utils/keyboard";

export const Frog: React.FC = observer(() => {
	const canvas = useCanvas();
	const { activeKey, history } = useKeyboard();
	const { addScore } = useFrogger();

	const addModelToCanvas = (model: TCanvasImage) => {
		canvas.clearModels();
		const position = calcCenterBottomPosition(canvas.canvas!, { width: model.width!, height: model.height! });
		canvas.addModel({ ...model, ...position });
	};

	useEffect(() => {
		const modelIndex = canvas.getModelIndex("Frog");
		const frog = canvas.models[modelIndex];
		if (!isArrowKey(activeKey) || modelIndex === -1 || !frog.image) {
			return;
		}

		const frogInNewPosition = calcNewModelPosition(frog, activeKey!);
		canvas.replaceModel(frogInNewPosition, modelIndex);

		const targetIndex = canvas.getModelIndex("Target");
		const target = canvas.models[targetIndex];
		if (calcIsColliding(frogInNewPosition, target)) {
			addScore();
			canvas.replaceModel(
				{
					...frogInNewPosition,
					width: frogInNewPosition.width! * 1.05,
					height: frogInNewPosition.height! * 1.05,
				},
				modelIndex
			);
		}
	}, [activeKey, history.length]);

	useEffect(() => {
		canvas.clearModels();
		canvas.clearCanvas();
		loadImage(frogModel, addModelToCanvas);
	}, []);

	return null;
});
