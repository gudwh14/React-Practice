import {useUserDispatcher, useUserState} from "./UserContextProvider";
import {useState, useEffect} from 'react';

const User = () => {
    const [inputs, setInputs] = useState({
        name : '',
        age : ''
    })

    const {name, age} = inputs;

    // context 가져오기
    const users = useUserState();
    const dispatcher = useUserDispatcher();

    const onChange = (e) => {
        const {name , value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    // dispatcher 를 이용해서 함수 구현하기
    const onADD = () => dispatcher(
        {
            type : 'ADD',
            user : {
                name : name,
                age : age
            }
        }
    )

    // dispatcher 를 이용해서 함수 구현하기
    const onDeleteByName = () => dispatcher (
        {
            type : "DELETE",
            name : 'JJo'
        }
    )

    useEffect(()=> {
        console.log(users);
    },[users])
    return (
        <>
            <input name='name' placeholder="이름" value={name} onChange={onChange}/>
            <input name='age' placeholder="나이" value={age} onChange={onChange}/>
            <button onClick={onADD}>추가</button>
            <button onClick={onDeleteByName}>삭제</button>
        </>
    )
}

export default User;