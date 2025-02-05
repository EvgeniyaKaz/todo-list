import styles from "./todo.module.css";
import { useState } from "react";
import { EditingForm } from "../editing-form/editing-form";

export const Todo = ({ id, title, refreshTodos }) => {
	const [isEditing, setIsEditing] = useState(false);

	const deleteTask = () => {
		const url = `${"http://localhost:3005/todos/"}${id}`;

		fetch(url, {
			method: "DELETE",
		}).finally(() => refreshTodos());
	};

	const onTodoEdit = () => {
		setIsEditing(true);
	};

	return (
		<>
			<li className={styles["container_main_todo"]}>
				<div className={styles["container_main_todo_active-todo"]}>
					{isEditing ? (
						<EditingForm
							id={id}
							refreshTodos={refreshTodos}
							title={title}
						/>
					) : (
						<>
							<span onClick={onTodoEdit} className={styles.title}>
								{title}
							</span>
							<button
								onClick={() => deleteTask()}
								className={styles["container_main_todo_button"]}
							>
								🞪
							</button>
						</>
					)}
				</div>
			</li>
		</>
	);
};
