import {useEffect,useState,useRef} from 'react';

/*
    useRef 를 사용하여 컴포넌트 안에서 조회, 수정 할 수 있는 변수를 관리
    useRef 로 관리하는 변수는 값이 변해도 리렌더링 되지 않습니다.
    `setInterval, setTimeout` 을 통해 만들어진 ID, 외부 라이브러리를 통해 생성된 인스턴스 , scroll 위치 값들을 관리 할 수 있습니다.
 */
const Variable = () => {
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
    const onCreate = () => {
        const user = {
            id : nextId.current,
            username,
            email
        }
        setUsers([...users,user]); // 배열에 Data 추가할때는 push, slice , sort 등 함수 사용 X
        // 불변성을 지키기위해 spread 연산자 사용 , concat 함수 사용하기
        // setUser(users.concat(user));

        nextId.current +=1; // 참조값을 +1
    }

    // filter 를 이용한 배열원소 삭제하기
    const onDelete = (id) => {
        setUsers(
            users.filter(user=> user.id !== id)
        )
    }

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
    const onModify = (id) => {
        setUsers(
            users.map((user)=> {
                return user.id === id ? {...user, username: "수정됨"} : user
            })
        )

    }

    useEffect(()=> {
        console.log(users);
    },[])
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

export default Variable;