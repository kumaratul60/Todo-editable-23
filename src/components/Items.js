import { useState } from "react";

export const Items = ({
  item,
  completed,
  id,
  updateCompleted,
  deleteTodo,
  editTodo
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(item);

  const handleDoubleClick = () => {
    if (!completed) {
      setEdit(true);
    }
  };

  const handleBlur = () => {
    setEdit(false);
    editTodo(id, editText);
  };

  return (
    <div className="items">
      <div className="done" onClick={() => updateCompleted(id)}>
        {completed ? "✔" : ""}
      </div>
      <div
        className={`task ${completed ? "strike" : ""}`}
        onDoubleClick={handleDoubleClick}
      >
        {edit ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          item
        )}
      </div>
      <div className="close" onClick={() => deleteTodo(id)}>
        ❌
      </div>
    </div>
  );
};
