import { observer } from "mobx-react-lite";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { ActiveKeyDisplay } from "./ActiveKeyDisplay";
import { Counter } from "./Counter";

export const LettersAndNumbers: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.LettersAndNumbers) {
		return null;
	}

	return (
		<>
			<ActiveKeyDisplay />
			<Counter />
		</>
	);
});
