import TodoItem from "./TodoItem";
import React from "react";
/*
    Presentational 컴포넌트
    컴포넌트 리렌더링 성능 최적화를 위해 컴포넌트를 분할 한다.
    TodoItem, TodoList , Todos

    React.memo 를 사용하여 전달하는 props 가 바뀌지 않으면 리렌더링 방지
 */
const TodoList = ({todos, onToggle}) => {
    return (
      <ul>
          {todos.map((todo)=> {
              return (
                  <TodoItem key={todo.id} todo={todo} onToggle={onToggle}/>
              )
          })}
      </ul>
    );
}

export default React.memo(TodoList);