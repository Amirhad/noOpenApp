import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodo, removeTodo, updateCheck } from "./actions";
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


  const handleChange = (id,completed) =>{
    dispatch(updateCheck(id,completed));

  }

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
                {
                  item.checking ? <ReactLoading type="spin" color="blue" height="20px" width="20px" /> : (
                    <input
                    type="checkbox"
                    checked={item.completed} 
                    onChange={() => handleChange(item.id, item.completed)}/>
                  )
                }
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
