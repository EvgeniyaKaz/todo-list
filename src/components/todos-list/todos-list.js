import styles from "./todos-list.module.css";
import { SortingAndSearchingButtons, Todo } from "./components";

export const TodosList = ({
	isLoading,
	refreshTodos,
	startSearching,
	startSorting,
	arrayOfTodos,
}) => {
	return (
		<>
			<SortingAndSearchingButtons
				startSearching={startSearching}
				startSorting={startSorting}
			/>
			<div className={styles["container_header"]}>
				<h1 className={styles["container_header_text"]}>Список дел:</h1>
			</div>
			<ul className={styles["container_main"]}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					arrayOfTodos.map(({ title, id }) => (
						<div key={id}>
							<Todo
								id={id}
								title={title}
								refreshTodos={refreshTodos}
							/>
						</div>
					))
				)}
			</ul>
		</>
	);
};
