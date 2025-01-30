import styles from "./block-todos.module.css";
import { useState } from "react";

export const EditingForm = ({ id, status, refreshTodos }) => {
	const [value, setValue] = useState("");

	const changeTaskText = (id) => {
		const idTodo = id.id;

		const url = "http://localhost:3005/todos/" + idTodo;

		fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: value,
				status: false,
			}),
		})
			.then(() => refreshTodos())
			.finally(() => setValue(""));
	};

	return (
		<>
			<input
				className={styles["container_main_todo_input"]}
				value={value}
				key={Math.random()}
				type="text"
				onChange={({ target }) => setValue(target.value)}
			/>
			<button
				className={styles["container_main_todo_button"]}
				disabled={status === true ? true : false}
			>
				Изменить
			</button>
			<button
				className={styles["container_main_todo_button"]}
				onClick={() => changeTaskText({ id })}
			>
				Готово
			</button>
		</>
	);
};
