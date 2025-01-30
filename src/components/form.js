import styles from "../App.module.css";

export const Form = ({ addTask, inputValue, setInputValue, isValid }) => {
	return (
		<>
			<form className={styles["container_form"]} onSubmit={addTask}>
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
					disabled={isValid}
				>
					Создать
				</button>
			</form>
		</>
	);
};
