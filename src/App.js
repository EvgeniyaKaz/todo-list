import { useEffect, useState } from "react";
import { NewTaskForm, TodosList } from "./components";

function App() {
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
						inputValue={inputValue}
					/>
				</main>
			</div>
		</>
	);
}

export default App;
