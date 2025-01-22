import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodo) => {
        setTodo(loadedTodo);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);
  console.log(todo);
  return (
    <div className={styles.container}>
      <header className={styles["container_header"]}>
        <h1 className={styles["container_header_text"]}>Todo list</h1>
      </header>
      <main className={styles["container_main"]}>
        {todo.map(({ title, id }) => (
          <div className={styles["container_main_todo"]}>
            {id}.{title}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
