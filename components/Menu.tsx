import { observer } from "mobx-react";
import { useState } from "react";
import { menuItems } from "../data/menu";
import styles from "../styles/components/Menu.module.scss";
import cx from "classnames";
import { useNavigation } from "../stores/NavigationStore";

export const Menu: React.FC = observer(() => {
	const [isActive, setIsActive] = useState(false);
	const { activeMenuItem, setActiveMenuItem } = useNavigation();

	return (
		<div className={cx(styles.Menu, { [styles.active]: isActive })}>
			<div className={styles.menu_icon}>
				<img
					src={isActive ? "menu/close.png" : "menu/hamburger.png"}
					alt="menu"
					onClick={() => setIsActive(!isActive)}
				/>
			</div>
			{isActive && (
				<ul>
					{menuItems.map((item) => (
						<li
							key={item.id}
							className={cx("item", { [styles.active_item]: activeMenuItem === item.id })}
							onClick={() => setActiveMenuItem(item.id)}
						>
							<img src={`menu/${item.icon}`} alt={item.id} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
});
