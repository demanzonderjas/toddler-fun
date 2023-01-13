import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTypeIt } from "../../stores/TypeItStore";
import styles from "../../styles/components/TypeIt.module.scss";
import { Input } from "./Input";

export const CorrectWordList: React.FC = observer(() => {
	const { shuffle, correctWords } = useTypeIt();

	useEffect(() => {
		if (!correctWords.length) {
			shuffle();
		}
	}, [correctWords.length]);

	return (
		<div className={styles.CorrectWords}>
			{correctWords.map((word) => (
				<div className={styles.word} key={word}>
					{word.split("").map((char, index) => (
						<Input key={index} char={char} index={-999} />
					))}
				</div>
			))}
		</div>
	);
});
