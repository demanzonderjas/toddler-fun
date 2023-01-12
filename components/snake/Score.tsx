import { observer } from "mobx-react-lite";
import { useSnake } from "../../stores/SnakeStore";
import styles from "../../styles/components/Snake.module.scss";

export const Score: React.FC = observer(() => {
	const { score } = useSnake();

	return (
		<div className={styles.Score}>
			<span>{score}</span>
		</div>
	);
});
