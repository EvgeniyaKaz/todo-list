import styles from "./editing-form.module.css";
import { useState } from "react";

export const EditingForm = ({ id, refreshTodos }) => {
	const [value, setValue] = useState("");

	const changeTaskText = (event) => {
		event.preventDefault();

		const url = `${"http://localhost:3005/todos/"}${id}`;

		fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: value,
				isChange: false,
			}),
		})
			.then(() => refreshTodos())
			.finally(() => setValue(""));
	};

	return (
		<>
			<form onSubmit={changeTaskText}>
				<input
					className={styles["container_main_todo_input"]}
					value={value}
					key={id}
					type="text"
					onChange={({ target }) => setValue(target.value)}
				/>
				<button
					className={styles["container_main_todo_button"]}
					type="submit"
				>
					Готово
				</button>
			</form>
		</>
	);
};
