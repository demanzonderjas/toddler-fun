import { observer } from "mobx-react";
import { useEffect } from "react";
import { useKeyboard } from "../../stores/KeyboardStore";
import { useTypeIt } from "../../stores/TypeItStore";
import styles from "../../styles/components/TypeIt.module.scss";
import { Confetti } from "./Confetti";
import { Input } from "./Input";

export const InputHandler: React.FC = observer(() => {
	const { activeWord, handleLatestInput, correctDelay } = useTypeIt();
	const { history, activeKey } = useKeyboard();

	useEffect(() => {
		if (activeKey) {
			handleLatestInput(activeKey);
		}
	}, [history.length]);

	return (
		<div className={styles.TypeIt}>
			<div className={styles.inputs}>
				{activeWord.split("").map((char, index) => (
					<Input key={index} char={char} index={index} />
				))}
			</div>
			{correctDelay && <Confetti />}
		</div>
	);
});
