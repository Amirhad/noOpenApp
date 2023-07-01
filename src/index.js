import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
//осталось добавить метод path и прелоадер а также нужно сделать так чтобы кнопка была не активной
const initialState = {
  todos: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "load/todos/start":
      return{
        ...state,
        loading:true
      }

    case "load/start/fulfilled":
      return {
        ...state,
        todos: action.payload,
        loading:false
      };


    case "load/todo/delete":
      return{
        todos:state.todos.map(todo =>{
          if(todo.id === action.payload){
            return{
              ...todo,
              deleting:true
            }
          }
          return todo
        })
      }


    case "check/load/start":
      return{
        ...state,
        todos:state.todos.map(todo =>{
          if(todo.id === action.payload){
            return {
              ...todo,
              checking:true
            }
          }
          return todo
        })
      }

    case "check/load/succsess":
      return{
        ...state,
        todos:state.todos.map(todo =>{
          if(todo.id === action.payload){
            return{
              ...todo,
              completed: !todo.completed,
              checking:false
            }
          }
          return todo
        
        })
      }

    case "delete/todo/fulfilled":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
