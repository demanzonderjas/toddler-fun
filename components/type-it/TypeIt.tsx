import { observer } from "mobx-react";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { InputHandler } from "./InputHandler";
import { CorrectWordList } from "./CorrectWordList";
import { typeIt, TypeItContext } from "../../stores/TypeItStore";

export const TypeIt: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.TypeIt) {
		return null;
	}

	return (
		<TypeItContext.Provider value={typeIt}>
			<InputHandler />
			<CorrectWordList />
		</TypeItContext.Provider>
	);
});
