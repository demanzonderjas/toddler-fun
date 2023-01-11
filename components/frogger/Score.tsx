import { observer } from "mobx-react-lite";
import { useFrogger } from "../../stores/FroggerStore";
import styles from "../../styles/components/Frogger.module.scss";

export const Score: React.FC = observer(() => {
	const { score } = useFrogger();

	return (
		<div className={styles.Score}>
			<span>{score}</span>
		</div>
	);
});
