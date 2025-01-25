import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { BlockButtons, TodoList } from "./components";

function App() {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch("http://localhost:3005/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodo(loadedTodo);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodoFlag, isDeleting]);

	const searchTask = todo.filter((task) => {
		return task.title.toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
		<>
			<div className={styles.container}>
				<header>
					<form className={styles["container_form"]}>
						<input
							className={styles["container_form_input"]}
							type="search"
							placeholder="Введите название задания..."
							value={inputValue}
							onChange={({ target }) =>
								setInputValue(target.value)
							}
						/>
					</form>
					<BlockButtons
						todo={todo}
						setTodo={setTodo}
						inputValue={inputValue}
						setInputValue={setInputValue}
						refreshTodo={refreshTodo}
					/>
				</header>
				<main>
					<TodoList
						todo={todo}
						isLoading={isLoading}
						setIsDeleting={setIsDeleting}
						refreshTodo={refreshTodo}
						searchTask={searchTask}
					/>
				</main>
			</div>
		</>
	);
}

export default App;
