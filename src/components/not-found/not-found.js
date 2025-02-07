import styles from "./not-found.module.css"

export const NotFound = () => {
    return (
		<>
			<div className={styles.error}>
				<p className={styles["error_404"]}>Ошибка 404</p>
				<p className={styles["error_text"]}>Страница не найдена.</p>
				<p className={styles["error_text_two"]}>
					Неправильно набран адрес или такой страницы не существует.
				</p>
			</div>
		</>
	);
}