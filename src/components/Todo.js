import { useRef, useState } from "react";
import { Items } from "./Items";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTodos([
        ...todos,
        { item: e.target.value, completed: false, id: Date.now() }
      ]);
      inputRef.current.value = "";
    }
  };

  const handleUpdate = (id) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.completed = !e.completed;
      }
      return e;
    });
    setTodos(updatedList);
  };

  const hanldeDelete = (id) => {
    const filterTodo = todos.filter((item) => item.id !== id);
    setTodos(filterTodo);
  };
  const handleUpdateTodo = (id, text) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.item = text;
      }
      return e;
    });
    setTodos(updatedList);
  };
  return (
    <div className="App">
      <input
        ref={inputRef}
        placeholder="Enter todo..."
        onKeyPress={handleKeyPress}
      />

      {todos.map((itemText) => (
        <Items
          key={itemText.id}
          {...itemText}
          updateCompleted={handleUpdate}
          deleteTodo={hanldeDelete}
          editTodo={handleUpdateTodo}
        />
      ))}
    </div>
  );
};
export default Todo;
