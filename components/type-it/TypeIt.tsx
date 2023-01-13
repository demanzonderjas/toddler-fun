import { observer } from "mobx-react";
import { useEffect } from "react";
import { useKeyboard } from "../../stores/KeyboardStore";
import { useTypeIt } from "../../stores/TypeItStore";
import { Input } from "./Input";
import styles from "../../styles/components/TypeIt.module.scss";
import { Confetti } from "./Confetti";
import { useNavigation } from "../../stores/NavigationStore";
import { TMenuItemID } from "../../typings/navigation";

export const TypeIt: React.FC = observer(() => {
	const { activeWord, handleLatestInput, correctDelay, shuffle, correctWords } = useTypeIt();
	const { activeMenuItem } = useNavigation();
	const { history, activeKey } = useKeyboard();

	useEffect(() => {
		if (activeKey) {
			handleLatestInput(activeKey);
		}
	}, [history.length]);

	useEffect(() => {
		shuffle();
	}, []);

	if (activeMenuItem !== TMenuItemID.TypeIt) {
		return null;
	}

	return (
		<>
			<div className={styles.TypeIt}>
				<div className={styles.inputs}>
					{activeWord.split("").map((char, index) => (
						<Input key={index} char={char} index={index} />
					))}
				</div>
				{correctDelay && <Confetti />}
			</div>
			<div className={styles.CorrectWords}>
				{correctWords.map((word) => (
					<div className={styles.word} key={word}>
						{word.split("").map((char, index) => (
							<Input key={index} char={char} index={-999} />
						))}
					</div>
				))}
			</div>
		</>
	);
});
