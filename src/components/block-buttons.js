import styles from "../App.module.css";
import { useState } from "react";

export const BlockButtons = ({
	todo,
	setTodo,
	inputValue,
	setInputValue,
	refreshTodo,
}) => {
	const [blockButton, setBlockButton] = useState(false);

	const addTask = () => {
		setBlockButton(true);

		fetch("http://localhost:3005/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: inputValue,
				status: "Задача активна",
			}),
		})
			.then(() => refreshTodo())
			.finally(() => setBlockButton(false), setInputValue(""));
	};

	const sortTask = () => {
		const newTodo = [...todo];

		const sortArray = newTodo.sort((a, b) => (a.title > b.title ? 1 : -1));

		setTodo(sortArray);
	};

	return (
		<>
			<div className={styles["container_button-block"]}>
				<button
					className={styles["container_button-block_button"]}
					onClick={addTask}
					disabled={blockButton}
					type="submit"
				>
					Создать
				</button>
				<button
					className={styles["container_button-block_button"]}
					disabled={blockButton}
					onClick={sortTask}
				>
					Сортировать
				</button>
			</div>
		</>
	);
};
