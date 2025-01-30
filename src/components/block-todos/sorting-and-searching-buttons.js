import styles from "./block-todos.module.css";

export const SortingAndSearchingButtons = ({ sortTask, searchText }) => {
	return (
		<>
			<div className={styles.butt}>
				<button
					className={styles["container_header_button"]}
					onClick={sortTask}
				>
					Сортировать
				</button>
				<button
					className={styles["container_header_button"]}
					onClick={searchText}
				>
					Найти
				</button>
			</div>
		</>
	);
};
