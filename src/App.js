import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewTaskForm, TodosList, NotFound } from "./components";
import { Todo } from "./components/todos-list/components";

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
			<div>
				<header>
					<NewTaskForm
						inputValue={inputValue}
						setInputValue={setInputValue}
						refreshTodos={refreshTodos}
					/>
				</header>
				<main>
					<TodosList
						isLoading={isLoading}
						refreshTodos={refreshTodos}
						startSearching={startSearching}
						startSorting={startSorting}
						arrayOfTodos={arrayOfTodos}
					/>
				</main>
			</div>
		</>
	);
};

function App() {
	return (
		<>
			<div>
				<Routes>
					<Route path="/" element={<MainPage />}>
						<Route path="task/:id" element={<Todo />} />
					</Route>
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
