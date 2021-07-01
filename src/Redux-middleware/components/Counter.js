/*
    presentation 컴포넌트
 */
const Counter = ({number, onIncrease, onDecrease}) => {

    return (
        <div>
            <h1>{number}</h1>
            <span>onIncrease</span>
            <button onClick={onIncrease}>+1</button>
            <span>onDecrease</span>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;