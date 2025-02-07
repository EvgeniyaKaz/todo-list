import styles from "./todos-list.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SortingAndSearchingButtons, Todo } from "./components";

export const TodosList = ({
	isLoading,
	refreshTodos,
	startSearching,
	startSorting,
	arrayOfTodos,
}) => {
	const [isClick, setIsClick] = useState(false);

	const clickOnTheButton = () => {
		setIsClick(true);
	};

	return (
		<>
			<SortingAndSearchingButtons
				startSearching={startSearching}
				startSorting={startSorting}
			/>
			<div className={styles["container_header"]}>
				<h1 className={styles["container_header_text"]}>Список дел:</h1>
			</div>
			<ul className={styles["container_main"]}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : isClick ? (
					<Todo
						refreshTodos={refreshTodos}
						arrayOfTodos={arrayOfTodos}
						setIsClick={setIsClick}
					/>
				) : (
					arrayOfTodos.map(({ title, id }) => (
						<li className={styles["container_main_todo"]} key={id}>
							<Link
								to={`task/${id}`}
								className={
									styles["container_main_todo_text-todo"]
								}
							>
								<span
									key={id}
									className={
										styles["container_main_todo_text-todo"]
									}
									onClick={clickOnTheButton}
								>
									{title}
								</span>
							</Link>
						</li>
					))
				)}
			</ul>
		</>
	);
};
