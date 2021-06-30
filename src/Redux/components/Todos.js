import React , {useState} from "react";
import TodoList from "./TodoList";
/*
    Presentational 컴포넌트
    컴포넌트 리렌더링 성능 최적화를 위해 컴포넌트를 분할 한다.
    TodoItem, TodoList , Todos

    React.memo 를 사용하여 전달하는 props 가 바뀌지 않으면 리렌더링 방지
 */
const Todos = ({todos, onCreate, onToggle}) => {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onCreate(text);
        setText('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' onChange={onChange} value={text} placeholder="할 일을 입력하세요"/>
                <button type='submit'>등록</button>
            </form>
            <TodoList todos={todos} onToggle={onToggle}/>
        </div>
    )
}

export default React.memo(Todos);