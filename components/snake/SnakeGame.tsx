import { observer } from "mobx-react";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { Snake } from "./Snake";
import { snake, SnakeContext } from "../../stores/SnakeStore";
import { Target } from "./Target";
import { Score } from "./Score";
import { ArrowHelp } from "./ArrowHelp";

export const SnakeGame: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.Snake) {
		return null;
	}

	return (
		<SnakeContext.Provider value={snake}>
			<Snake />
			<Target />
			<ArrowHelp />
			<Score />
		</SnakeContext.Provider>
	);
});
