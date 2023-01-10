import { observer } from "mobx-react";
import { useKeyboard } from "../stores/KeyboardStore";
import styles from "../styles/components/ActiveKeyDisplay.module.scss";

export const ActiveKeyDisplay: React.FC = observer(() => {
	const { activeNumber, activeLetter } = useKeyboard();

	return (
		<div className={styles.ActiveKeyDisplay}>
			<span>{`${activeNumber || 0} ${activeLetter}`}</span>
		</div>
	);
});
