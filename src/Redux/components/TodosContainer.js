import {useSelector, useDispatch} from "react-redux";
import {useCallback} from "react";
import {addTodo, toggleTodo} from "../module/todos";
import Todos from "./Todos";

const TodosContainer = () => {

    /*
        useSelector 에서 꼭 개채를 반환할 필요는 없다.
        원하는 값만 반환 가능
     */
    const todos = useSelector(state => state.todos);

    // dispatch
    const dispatch = useDispatch();

    const onCreate = (text) => {
        dispatch(addTodo(text));
    }

    // useCallback 을 사용하여 최적화 진
    const onToggle = useCallback((id) => {
        dispatch(toggleTodo(id));
    },[dispatch]);

    return (
        <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
    )
}

export default TodosContainer;