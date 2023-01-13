import { observer } from "mobx-react";
import { useTypeIt } from "../../stores/TypeItStore";
import cx from "classnames";
import styles from "../../styles/components/TypeIt.module.scss";

export const Input: React.FC<{ char: string; index: number }> = observer(({ char, index }) => {
	const { correctCharsLength, activeInput } = useTypeIt();
	const isCorrect = correctCharsLength > index;
	const isActive = correctCharsLength === index;

	return (
		<div className={cx(styles.Input, { [styles.is_correct]: isCorrect })}>
			<div className={styles.placeholder}>
				<span>{char}</span>
			</div>
			{isActive && activeInput && (
				<div className={styles.value}>
					<span>{activeInput}</span>
				</div>
			)}
		</div>
	);
});
