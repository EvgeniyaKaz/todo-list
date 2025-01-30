import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { Form, TodosList } from "./components";

function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [isSorted, setIsSorted] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState(false);

	const refreshTodos = () => setRefreshTodoFlag(!refreshTodoFlag);

	const searchTask = todos.filter((task) => {
		return task.title.toLowerCase().includes(inputValue.toLowerCase());
	});

	useEffect(() => {
		setIsLoading(true);

		fetch("http://localhost:3005/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setIsLoading(false));

		if (inputValue.length > 3 && inputValue !== "") {
			return setIsValid(false);
		} else {
			return setIsValid(true);
		}
	}, [refreshTodoFlag, isValid, inputValue]);

	const addTask = (event) => {
		event.preventDefault();

		fetch("http://localhost:3005/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: inputValue,
				status: false,
			}),
		})
			.then(() => refreshTodos())
			.finally(() => setInputValue(""));
	};

	const sortTask = () => {
		setIsSorted(!isSorted);

		const newTodo = [...todos];

		const sortArray = newTodo.sort((a, b) => (a.title > b.title ? 1 : -1));

		if (isSorted) {
			setTodos(sortArray);
		}
	};

	const searchText = () => {
		setSearchPhrase(!searchPhrase);

		setTodos(searchTask);
	};

	return (
		<>
			<div className={styles.container}>
				<header>
					<Form
						addTask={addTask}
						inputValue={inputValue}
						setInputValue={setInputValue}
						isValid={isValid}
					/>
				</header>
				<main>
					<TodosList
						todos={todos}
						isLoading={isLoading}
						searchTask={searchTask}
						sortTask={sortTask}
						refreshTodos={refreshTodos}
						searchText={searchText}
						inputValue={inputValue}
					/>
				</main>
			</div>
		</>
	);
}

export default App;
