import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { EditingForm } from "./block-todos/editing-form";

export const TodosList = ({ isLoading, refreshTodos, arrayOfTodos }) => {
	return (
		<>
			<div className={styles["container_header"]}>
				<h1 className={styles["container_header_text"]}>Список дел:</h1>
			</div>
			<ul className={styles["container_main"]}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					arrayOfTodos.map(({ title, id, isChange }) => (
						<li className={styles["container_main_todo"]} key={id}>
							{isChange ? (
								<EditingForm
									id={id}
									refreshTodos={refreshTodos}
								/>
							) : (
								<Link
									key={id}
									className={
										styles[
											"container_main_todo_active-todo"
										]
									}
									to={`todo/${id}`}
								>
									{title}
								</Link>
							)}
						</li>
					))
				)}
			</ul>
		</>
	);
};
