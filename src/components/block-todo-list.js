import styles from "../App.module.css";

export const TodoList = ({
	isLoading,
	setIsDeleting,
	refreshTodo,
	searchTask,
}) => {
	const deleteTask = (numberId) => {
		setIsDeleting(true);

		const idTodo = numberId.id;
		const url = "http://localhost:3005/todos/" + idTodo;

		fetch(url, {
			method: "DELETE",
		}).finally(() => {
			setIsDeleting(false);
		});
	};

	const updateTask = (numberId) => {
		const idTodo = numberId.id;

		const url = "http://localhost:3005/todos/" + idTodo;

		fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				status: "Задача выполнена",
			}),
		})
			.then(() => refreshTodo())
			.finally();
	};
	return (
		<>
			<div className={styles["container_header"]}>
				<h1 className={styles["container_header_text"]}>Список дел:</h1>
			</div>
			<div className={styles["container_main"]}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					searchTask.map(({ title, id, status }) => (
						<div
							className={styles["container_main_todo"]}
							key={Math.random()}
						>
							<span
								key={id}
								className={
									status === "Задача активна"
										? styles[
												"container_main_todo_active-todo"
										  ]
										: styles[
												"container_main_todo_inactive-todo"
										  ]
								}
							>
								{title}
							</span>
							{status === "Задача активна" ? (
								<button
									className={
										styles["container_main_todo_button"]
									}
									onClick={() => updateTask({ id })}
								>
									Готово
								</button>
							) : null}
							<button
								onClick={() => deleteTask({ id })}
								className={styles["container_main_todo_button"]}
							>
								Удалить
							</button>
						</div>
					))
				)}
			</div>
		</>
	);
};
