import {useState} from 'react';

const MultiInput = () => {
    // 입력받는 값들을 객채로 받아서 inputs 라는 State 변수에 담아 둡니다.
    const [inputs, setInputs] = useState(
        {
            name : '',
            age : ''
        }
    )

    const { name , age } = inputs; // 비구조화 할당을 통해서 해당 값들을 추출합니다.

    const onChange = (e) => { // event 를 인자로 받아옵니다.
        const {value, name} = e.target; // event.target 으로 name , value 를 추출합니다.
        setInputs(
            {
                ...inputs, // 구조분해 할당을 통해 불변성을 지켜 객채를 복사합니다.
                [name] : value // target 의 name , value 를 통해 input 값을 변경해 줍니다.
            }
        )
    }

    return (
        <div>
            {/*event 로 name , value 를 넘겨주기 위해 name 을 객채로 선언한 이름으로 설정해줍니다.*/}
            <input name='name' placeholder="이름" value={name} onChange={onChange}/>
            <input name='age' placeholder="나이" value={age} onChange={onChange}/>
            <div>
                {name}
                {age}
            </div>
        </div>
    )
}

export default MultiInput;