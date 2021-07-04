import {useSelector,useDispatch} from "react-redux";
import {increaseAsync , decreaseAsync} from "../ReduxSagaModule/counter";
import Counter from "./Counter";



const CounterContainer = () => {
    const number = useSelector(state => state.counter);

    const dispatch = useDispatch();

    const onIncrease = () => {
        dispatch(increaseAsync());
    }

    const onDecrease = () => {
        dispatch(decreaseAsync());
    }

    return (
        <Counter
            number={number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
}

export default CounterContainer;