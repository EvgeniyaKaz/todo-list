import styles from "./App.module.css";
import { useEffect, useState } from "react";
import {
	NewTaskForm,
	SortingAndSearchingButtons,
	TodosList,
	NotFound,
} from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { Todo } from "./components/block-todos";

const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshTodoFlag, setIsRefreshTodoFlag] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isSort, setIsSort] = useState(false);
	const [isSearchPhrase, setIsSearchPhrase] = useState(false);

	const refreshTodos = () => setIsRefreshTodoFlag(!isRefreshTodoFlag);

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
	}, [isRefreshTodoFlag, inputValue]);

	const sortTodos = (todos) => {
		const sortArray = todos.sort((a, b) => (a.title > b.title ? 1 : -1));
		return sortArray;
	};

	const startSorting = () => {
		return setIsSort(!isSort);
	};

	const startSearching = () => {
		return setIsSearchPhrase(!isSearchPhrase);
	};

	const searchTodos = todos.filter((todo) => {
		return todo.title.toLowerCase().includes(inputValue.toLowerCase());
	});

	const sortedArrayTodos = isSort ? sortTodos(todos) : todos;

	const arrayOfTodos = isSearchPhrase ? searchTodos : sortedArrayTodos;

	return (
		<>
			<header>
				<NewTaskForm
					inputValue={inputValue}
					setInputValue={setInputValue}
					refreshTodos={refreshTodos}
				/>
			</header>
			<main>
				<SortingAndSearchingButtons
					startSearching={startSearching}
					startSorting={startSorting}
				/>
				<TodosList
					isLoading={isLoading}
					refreshTodos={refreshTodos}
					arrayOfTodos={arrayOfTodos}
				/>
			</main>
		</>
	);
};

function App() {
	return (
		<>
			<div className={styles.container}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="todo/:id" element={<Todo />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
