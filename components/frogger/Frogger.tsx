import { observer } from "mobx-react";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { Frog } from "./Frog";

export const Frogger: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.Frogger) {
		return null;
	}

	return (
		<>
			<Frog />
		</>
	);
});
