import styles from "./block-todos.module.css";

export const Todo = ({ id, title, refreshTodos, inputValue }) => {
	const startChange = (id) => {
		const url = "http://localhost:3005/todos/" + id;

		fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: inputValue,
				isChange: true,
			}),
		}).then(() => refreshTodos());
	};

	const deleteTask = () => {
		const url = `${"http://localhost:3005/todos/"}${id}`;

		fetch(url, {
			method: "DELETE",
		}).finally(() => refreshTodos());
	};
	return (
		<>
			<span
				key={id}
				className={styles["container_main_todo_active-todo"]}
			>
				{title}
			</span>
			<button
				className={styles["container_main_todo_button"]}
				onClick={() => startChange(id)}
			>
				Изменить
			</button>
			<button
				onClick={() => deleteTask()}
				className={styles["container_main_todo_button"]}
			>
				Удалить
			</button>
		</>
	);
};
