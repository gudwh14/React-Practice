/*
    Container Components
    리덕스 스토어에 직접적으로 접근하여 상태를 조회하거나 액션을 디스패치  할 수 있는 컴포넌트
    HTML 태그를 사용하지 않고 Presentational 컴포넌트를 불러와 사용해야 한다.
 */
import Counter from "./Counter";
import {useSelector , useDispatch} from "react-redux";
import {increase,decrease , setDiff} from "../module/counter";

const CounterContainer = () => {
    // useSelector 는 리덕스 스토어의 상태를 조회하는 HOOK 입니다.
    // state 의 값은 store.getState() 함수를 호출했을때 나타나는 값과 같습니다.
    // number , diff 상태 값을 리덕스 스토어에서 조회하여 매칭시켜 줍니다.
    const {number , diff } = useSelector(state => ({
        number : state.counter.number,
        diff : state.counter.diff
    }))

    // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 가능하게 만들어주는 HOOK 입니다.
    const dispatch = useDispatch();

    const onIncrease = () => {
        dispatch(increase());
    }

    const onDecrease = () => {
        dispatch(decrease());
    }

    const onSetDiff = (diff) => {
        dispatch(setDiff(diff));
    }


    // props 로 전달 시켜주기
    return (
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

export default CounterContainer;