import "./App.css";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function App() {
  const [todoData, setTodoData] = useState("");
  const [all_todos, setAll_Todos] = useState([]);

  const changeHandler = (e) => {
    setTodoData(e.target.value);
  };
  const Add = async () => {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todoData }),
    });

    await fetchTodos();
  };

  const fetchTodos = async () => {
    setTodoData("");
    await fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setAll_Todos(data));
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    if (JSON.stringify(data) !== JSON.stringify(all_todos)) {
      setAll_Todos(data);
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchTodos();
  };

  useEffect(() => {
    // fetches the existing data from DB to display the existing values which is needed to perform only once
    fetchTodos();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Add();
    }
  };

  return (
    <div className="main-div">
      <div className="add-todo">
        <input
          type="text"
          className="todo_input"
          placeholder="enter your todo here"
          onChange={changeHandler}
          value={todoData}
          onKeyDown={handleKeyPress}
        />
        <button onClick={todoData !== "" ? Add : null} className="btn">
          Add
        </button>
      </div>
      <h1>Your Todos</h1>

      {all_todos.length > 0 ? (
        all_todos.map((todo) => {
          return (
            <div key={todo._id} className="todo-item">
              <input type="checkbox" className="checkbox" />{" "}
              <span className="todo">{todo.todo}</span>
              <MdDelete
                onClick={() => deleteTodo(todo._id)}
                className="delete"
              />
            </div>
          );
        })
      ) : (
        <p>No todos yet</p>
      )}
    </div>
  );
}

export default App;
