/*
    Presentational Component
    리덕스 스토어에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props 로만 받아와서 사용하는 컴포넌트입니다.
    DOM 마크업과 스타일을 담당합니다.
 */

const Counter = ({number, diff , onIncrease, onDecrease, onSetDiff}) => {

    const onChange = (e) => {
        onSetDiff(parseInt(e.target.value,10));
    };

    return (
        <div>
            <h1>number : {number}</h1>
            <div>
                <h2>diff : {diff}</h2>
                <span>diff 변경</span>
                <input type='number' value={diff} min='1' onChange={onChange}/>
                <div>
                    <span>Increase</span>
                    <button onClick={onIncrease}>+</button>
                    <span>Decrease</span>
                    <button onClick={onDecrease}>-</button>
                </div>
            </div>
        </div>
    )
}

export default Counter;