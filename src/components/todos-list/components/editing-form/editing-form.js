import styles from "./editing-form.module.css";
import { useState } from "react";

export const EditingForm = ({ id, refreshTodos, title }) => {
	const [newTitle, setNewTitle] = useState(title);

	const changeTaskText = (event) => {
		event.preventDefault();

		const url = `${"http://localhost:3005/todos/"}${id}`;

		fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: newTitle,
				isChange: false,
			}),
		})
			.then(() => refreshTodos())
			.finally(() => setNewTitle(""));
	};

	return (
		<>
			<form onSubmit={changeTaskText} className={styles.form}>
				<input
					className={styles["container_main_todo_input"]}
					value={newTitle}
					key={id}
					type="text"
					onChange={({ target }) => setNewTitle(target.value)}
				/>
				<button
					className={styles["container_main_todo_button"]}
					type="submit"
				>
					✔
				</button>
			</form>
		</>
	);
};
