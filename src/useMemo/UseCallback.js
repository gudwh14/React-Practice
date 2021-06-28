import React, {useState, useRef, useCallback} from 'react';

/*
useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면
useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용합니다.

React.memo 를 사용하여 컴포넌트 리렌더링을 방지 할 수 있습니다.

users 배열이 바뀔때마다 함수가 새로 만들어지는데
deps 에서 users 를 지우고 함수형 업데이트를 사용하면 함수를 호출을 최적화 할 수 있습니다.

useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 사용하기
 */
const UseCallback = () => {
    // users 배열 선언
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'jjo',
            email: 'jjo@gmail.com'
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        }
    ]);

    // users 의 다음 id 참조값으로 useRef 객채 만들어 줍니다.
    const nextId = useRef(users.length+1);

    // input state 값들을 관리해줍니다.
    const [inputs, setInputs] = useState(
        {
            username : '',
            email : ''
        });

    const {username, email} = inputs;

    const onChange = (e) => {
        const {name ,value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    }

    // user 추가 하기
    const onCreate = useCallback(() => {
        const user = {
            id : nextId.current,
            username,
            email
        }
        setUsers([...users,user]); // 배열에 Data 추가할때는 push, slice , sort 등 함수 사용 X
        // 불변성을 지키기위해 spread 연산자 사용 , concat 함수 사용하기
        // setUser(users.concat(user));

        nextId.current +=1; // 참조값을 +1
    },[users,username,email]);

    // 함수형 업데이트
    const onCreateFuncUpdate = useCallback(() => {
        const user = {
            id : nextId.current,
            username,
            email
        }
        setUsers(users => [...users,user]); // 배열에 Data 추가할때는 push, slice , sort 등 함수 사용 X
        // 불변성을 지키기위해 spread 연산자 사용 , concat 함수 사용하기
        // setUser(users => users.concat(user));

        nextId.current +=1; // 참조값을 +1
    },[users,username,email]);

    // filter 를 이용한 배열원소 삭제하기
    const onDelete = useCallback((id) => {
        setUsers(
            users.filter(user=> user.id !== id)
        )
    },[users])

    // 함수형 업데이트
    const onDeleteFuncUpdate = useCallback((id) => {
        setUsers(
            user=> users.filter(user=> user.id !== id)
        )
    },[users])

    // map() 함수를 사용해 users 데이터 렌더링 해주기
    const render = users.map((user)=> {
        return (
            // key 값은 중복되지 않는 unique 한 값을 넣어줘야 합니다.
            <div key={user.id}>
                <div>ID : {user.id}</div>
                <div>name : {user.username}</div>
                <div>email : {user.email}</div>
                <button onClick={()=> onDelete(user.id)}>삭제</button>
                <button onClick={()=>{onModify(user.id)}}>수정</button>
            </div>
        )
    })

    // users 배열 수정하기
    const onModify = useCallback((id) => {
        setUsers(
            users.map((user)=> {
                return user.id === id ? {...user, username: "수정됨"} : user
            })
        )
    },[users])

    // 함수형 업데이트
    const onModifyFuncUpdate = useCallback((id) => {
        setUsers( users =>
            users.map((user)=> {
                return user.id === id ? {...user, username: "수정됨"} : user
            })
        )
    },[users])

    return (
        <div>
            <div>
                <input name="username" placeholder="이름" value={username} onChange={onChange}/>
                <input name="email" placeholder="이메일" value={email} onChange={onChange}/>
                <button onClick={onCreate}>추가</button>
            </div>
            {render}
        </div>
    )
}

export default React.memo(UseCallback);