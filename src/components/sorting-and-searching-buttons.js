import styles from "../App.module.css";

export const SortingAndSearchingButtons = ({
	startSearching,
	startSorting,
}) => {
	return (
		<>
			<div className={styles.butt}>
				<button
					className={styles["container_header_button"]}
					onClick={startSorting}
				>
					Сортировать
				</button>
				<button
					className={styles["container_header_button"]}
					onClick={startSearching}
				>
					Найти
				</button>
			</div>
		</>
	);
};
