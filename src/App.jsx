import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodo, removeTodo } from "./actions";
import ReactLoading from "react-loading";

function App() {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodo());
  }, []);

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };
  return (
    <div className="center">
      <header>Список дел:{todos.length}</header>
      <hr />
      {loading ? (
        <ReactLoading type="spin" color="red" height="40px" width="40px" />
      ) : (
        todos.map((item) => {
          return (
            <div id="task-list">
              <ul>
                <li>
                  <input type="checkbox" checked={item.completed} />
                  <span>{item.title}</span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={item.deleting}
                    class="delete-btn"
                  >
                    удалить
                  </button>
                </li>
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
