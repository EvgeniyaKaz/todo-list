import styles from "../App.module.css";

export const NewTaskForm = ({ refreshTodos, inputValue, setInputValue }) => {
	const addTodo = (event) => {
		event.preventDefault();

		fetch("http://localhost:3005/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: inputValue,
				isChange: false,
			}),
		})
			.then(() => refreshTodos())
			.finally(() => setInputValue(""));
	};

	const isValid = () => {
		if (inputValue.length > 3 && inputValue !== "") {
			return false;
		} else {
			return true;
		}
	};
	return (
		<>
			<form className={styles["container_form"]} onSubmit={addTodo}>
				<input
					className={styles["container_form_input"]}
					type="text"
					placeholder="Введите название задания..."
					value={inputValue}
					onChange={({ target }) => setInputValue(target.value)}
				/>
				<button
					className={styles["container_form_button"]}
					type="submit"
					disabled={isValid()}
				>
					Создать
				</button>
			</form>
		</>
	);
};
