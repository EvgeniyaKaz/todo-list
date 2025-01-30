import styles from "./block-todos.module.css";

export const Todo = ({ id, status, title, refreshTodos, updateTask }) => {
	const deleteTask = (numberId) => {
		const idTodo = numberId.id;

		const url = "http://localhost:3005/todos/" + idTodo;

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
				onClick={() => updateTask({ id })}
				disabled={status === true ? true : false}
			>
				Изменить
			</button>
			<button
				onClick={() => deleteTask({ id })}
				className={styles["container_main_todo_button"]}
			>
				Удалить
			</button>
		</>
	);
};
