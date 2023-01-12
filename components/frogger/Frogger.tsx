import { observer } from "mobx-react";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { Frog } from "./Frog";
import { frogger, FroggerContext } from "../../stores/FroggerStore";
import { Target } from "./Target";
import { Score } from "./Score";
import { ArrowHelp } from "./ArrowHelp";

export const Frogger: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.Frogger) {
		return null;
	}

	return (
		<FroggerContext.Provider value={frogger}>
			<Frog />
			<Target />
			<ArrowHelp />
			<Score />
		</FroggerContext.Provider>
	);
});
