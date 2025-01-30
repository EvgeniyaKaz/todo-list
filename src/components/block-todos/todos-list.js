import styles from "./block-todos.module.css";
import { SortingAndSearchingButtons } from "./sorting-and-searching-buttons";
import { EditingForm } from "./editing-form";
import { Todo } from "./todo";

export const TodosList = ({
	todos,
	isLoading,
	sortTask,
	refreshTodos,
	searchText,
	inputValue,
}) => {
	const updateTask = (numberId) => {
		const idTodo = numberId.id;
		console.log(idTodo);

		const url = "http://localhost:3005/todos/" + idTodo;

		fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: inputValue,
				status: true,
			}),
		}).then(() => refreshTodos());
	};

	return (
		<>
			<SortingAndSearchingButtons
				sortTask={sortTask}
				searchText={searchText}
			/>
			<div className={styles["container_header"]}>
				<h1 className={styles["container_header_text"]}>Список дел:</h1>
			</div>
			<div className={styles["container_main"]}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todos.map(({ title, id, status }) => (
						<div
							className={styles["container_main_todo"]}
							key={Math.random()}
						>
							{status === true ? (
								<EditingForm
									id={id}
									status={status}
									refreshTodos={refreshTodos}
								/>
							) : (
								<Todo
									id={id}
									status={status}
									title={title}
									refreshTodos={refreshTodos}
									updateTask={updateTask}
								/>
							)}
						</div>
					))
				)}
			</div>
		</>
	);
};
