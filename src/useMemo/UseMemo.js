import {useState, useMemo} from 'react';

const UseMemo = () => {
    const [number, setNumber] = useState([1,2,3]);
    const [string , setString] = useState("");


    /*
    기본 함수 다른 State 가 변경될때마다 함수가 호출된다.
     */
    const countOne = () => {
        console.log("counting...")
        return number.filter(num => num === 1).length;
    }

    const one = countOne();
    /*
    useMemo 사용 함수 number State 가 호출될때만 함수가 호출된다.
     */
    const useMemoCountOne = useMemo(() => {
        console.log("useMemo : counting...")
        return number.filter(num => num === 1).length;
    },[number]);


    return (
        <>
            <input placeholder="스트링 변경" value={string} onChange={event => {setString(event.target.value)}}/>
            <button onClick={()=>{setNumber([...number,1])}}>추가</button>
            <div>{one}</div>
            <div>{useMemoCountOne}</div>
        </>
    )
}

export default UseMemo;