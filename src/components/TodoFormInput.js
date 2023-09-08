import { useState } from "react";
import { Items } from "./Items";

const TodoFormInput = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todoItem) => [...todoItem, input]);
    setInput("");
  };

  const hanldeDelete = (id) => {
    const filterTodo = todos.filter((item) => item.id !== id);
    setTodos(filterTodo);
  };

  const unique = [...new Set(todos)];
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
      </form>

      {unique &&
        unique.map((itemText, idx) => (
          <Items key={idx} item={itemText} deleteTodo={hanldeDelete} />
        ))}
    </div>
  );
};

export default TodoFormInput;
