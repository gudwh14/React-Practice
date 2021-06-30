import React , {useState} from "react";
/*
    Presentational 컴포넌트
    컴포넌트 리렌더링 성능 최적화를 위해 컴포넌트를 분할 한다.
    TodoItem, TodoList , Todos

    React.memo 를 사용하여 전달하는 props 가 바뀌지 않으면 리렌더링 방지
 */


const TodoItem = ({todo , onToggle}) => {
    return (
        <li style={{textDecoration : todo.done ? 'line-through' : 'none'}} onClick={()=>onToggle(todo.id)}>
            {todo.text}
        </li>
    )
}

export default React.memo(TodoItem);