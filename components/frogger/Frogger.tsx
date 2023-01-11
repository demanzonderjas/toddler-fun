import { observer } from "mobx-react";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";
import { Frog } from "./Frog";
import styles from "../../styles/components/Frogger.module.scss";
import { frogger, FroggerContext } from "../../stores/FroggerStore";
import { Target } from "./Target";
import { Score } from "./Score";

export const Frogger: React.FC = observer(() => {
	const { activeMenuItem } = useNavigation();

	if (activeMenuItem !== TMenuItemID.Frogger) {
		return null;
	}

	return (
		<FroggerContext.Provider value={frogger}>
			<Frog />
			<Target />
			<img className={styles.arrows} src="/frogger/arrow-icons.jpg" alt="arrows" />
			<Score />
		</FroggerContext.Provider>
	);
});
