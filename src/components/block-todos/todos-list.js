import styles from "./block-todos.module.css";
import { SortingAndSearchingButtons } from "./sorting-and-searching-buttons";
import { EditingForm } from "./editing-form";
import { Todo } from "./todo";

export const TodosList = ({
	isLoading,
	refreshTodos,
	startSearching,
	startSorting,
	arrayOfTodos,
	inputValue,
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
					arrayOfTodos.map(({ title, id, isChange }) => (
						<li className={styles["container_main_todo"]} key={id}>
							{isChange ? (
								<EditingForm
									id={id}
									refreshTodos={refreshTodos}
								/>
							) : (
								<Todo
									id={id}
									title={title}
									refreshTodos={refreshTodos}
									inputValue={inputValue}
								/>
							)}
						</li>
					))
				)}
			</ul>
		</>
	);
};
