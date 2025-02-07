import styles from "./todo.module.css";
import { EditingForm } from "../editing-form/editing-form";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export const Todo = ({ refreshTodos, arrayOfTodos, setIsClick }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isBack, setIsBack] = useState(false);

	const deleteTask = (id) => {
		const url = `${"http://localhost:3005/todos/"}${id}`;

		fetch(url, {
			method: "DELETE",
		}).finally(() => refreshTodos());
	};

	const onTodoEdit = () => {
		setIsEditing(true);
	};

	const params = useParams();

	const idTodo = params.id;

	const todo = arrayOfTodos.filter((item) => item.id === idTodo);

	const returnToPreviousPage = () => {
		setIsClick(false);
		setIsBack(true);
	};

	return (
		<>
			<button onClick={returnToPreviousPage} className={styles.button}>
				<Link to="/" className={styles.button}>
					⬅
				</Link>
			</button>
			{todo.map(({ id, title }) => (
				<div key={id} className={styles["container_main_todo"]}>
					{isEditing ? (
						<EditingForm
							id={id}
							refreshTodos={refreshTodos}
							title={title}
						/>
					) : (
						<div key={id} className={styles.div}>
							<span onClick={onTodoEdit} className={styles.title}>
								{title}
							</span>
							<button
								onClick={() => deleteTask(id)}
								className={styles["container_main_todo_button"]}
							>
								🞪
							</button>
						</div>
					)}
				</div>
			))}
		</>
	);
};
