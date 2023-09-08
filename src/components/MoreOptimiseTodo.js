import { useState, useRef, useCallback } from "react";
import { Items } from "./Items";

const TodoOptimise = () => {
  const [todos, setTodos] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const inputRef = useRef();

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
        // Save the current state to undo history
        setUndoHistory((prevHistory) => [...prevHistory, todos]);
        setRedoHistory([]); // Clear redo history

        setTodos([
          ...todos,
          { item: e.target.value, completed: false, id: Date.now() }
        ]);
        inputRef.current.value = "";
      }
    },
    [todos]
  );

  const undo = () => {
    if (undoHistory.length > 0) {
      const prevState = undoHistory[undoHistory.length - 1];
      const newUndoHistory = [...undoHistory];
      newUndoHistory.pop();
      setUndoHistory(newUndoHistory);

      setRedoHistory((prevHistory) => [...prevHistory, todos]);
      setTodos(prevState);
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      const newRedoHistory = [...redoHistory];
      newRedoHistory.pop();
      setRedoHistory(newRedoHistory);

      setUndoHistory((prevHistory) => [...prevHistory, todos]);
      setTodos(nextState);
    }
  };

  const handleUpdate = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleUpdateTodo = useCallback((id, text) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, item: text } : todo))
    );
  }, []);

  return (
    <div className="App">
      <input
        ref={inputRef}
        placeholder="Enter todo..."
        onKeyPress={handleKeyPress}
      />

      <button onClick={undo} disabled={undoHistory.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={redoHistory.length === 0}>
        Redo
      </button>
      {todos.map((itemText) => (
        <Items
          key={itemText.id}
          {...itemText}
          updateCompleted={handleUpdate}
          deleteTodo={handleDelete}
          editTodo={handleUpdateTodo}
        />
      ))}
    </div>
  );
};

export default TodoOptimise;
