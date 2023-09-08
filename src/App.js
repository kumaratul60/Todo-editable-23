import "./styles.css";
import Todo from "./components/Todo";
import TodoOptimise from "./components/MoreOptimiseTodo";
// import TodoFormInput from "./components/TodoFormInput";

export default function App() {
  return (
    <div className="App">
      {/* <Todo /> */}
      {/* <TodoFormInput /> */}
      <TodoOptimise />
    </div>
  );
}
