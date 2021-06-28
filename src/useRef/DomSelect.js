import {useRef, useEffect} from 'react';
// useRef 를 이용한 Dom Select
const DomSelect = () => {
    const nameRef = useRef(); // useRef() 를 사용하여 Ref 객채를 생성해 줍니다, 객채를 선택하고있는 DOM 에 ref 값으로 설쟁해줘야합니다.
    const ageRef = useRef();

    useEffect(()=> {
        console.log("nameRef", nameRef); // current: input#name 가르키고 있음.
        console.log("ageRef", ageRef);  // current: input#age 가르키고 있음.
    },[])

    const focusToName = () => {
        nameRef.current.focus();  // nameRef 로 포커스가 이동하게 됩니다.
    };
    const focusToAge = () => {
        ageRef.current.focus(); // nameRef 로 포커스가 이동하게 됩니다.
    };


    return (
        <div>
            {/*ref 값으로 Ref 객채를 넣어준다*/}
            <input id='name' placeholder="이름" ref={nameRef}/>
            <input id='age' placeholder="나이" ref={ageRef}/>
            <div>
                <button onClick={focusToName}>이름포커스</button>
                <button onClick={focusToAge}>나이포커스</button>
            </div>
        </div>
    )
}

export default DomSelect;