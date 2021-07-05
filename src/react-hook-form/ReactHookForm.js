import { useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

/*
    프로젝트에서 회원가입등 FORM 형식을 사용할 경우 가 생기는데 이때
    INPUT 값들이 많아지게 되면 useState 여러개를 사용하여 작성해야 해서 코드 복잡성이 높아진다.
    이때 react-hook-form 라이브러리를 이용하면 간단하게 FORM 을 구성 할 수 있다.

    유효성 검사를 위해 스키마를 작성해서 검사를 진행한다. yup 사용!
    npm install @hookform/resolvers yup
 */

// 유효성 검사 스키마 생성
const schema = yup.object({
    name : yup.string().max(20, "이름은 20자 미만 이여야 합니다.").required('이름은 필수 항목 입니다'),
    age : yup.number().required('나이는 필수 항목 입니다.'),
    nickname : yup.string().min(3, "닉네임은 최소 3글자 이상이여야 합니다").max(10, "닉네임은 10자 미만이여야 합니다").required("닉네임은 필수 항목 입니다."),
})

const ReactHookForm = () => {
    // hook-form 사용하기
    const {register, handleSubmit , formState : {errors}} = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    // handleSubmit 으로 함수를 넘겨줘서 사용한다
    // {...register( ${name}, [options])}
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    이름
                    <input type='text' {...register("name")}/>
                    <p>{errors.name?.message}</p>
                </label>
                <label>
                    나이
                    <input defaultValue='10' type='number' {...register("age")}/>
                    <p>{errors.age?.message}</p>
                </label>
                <label>
                    별명
                    <input type='text' {...register("nickname")}/>
                    <p>{errors.nickname?.message}</p>
                </label>
                <button type='submit'>확인</button>
            </form>
        </>
    );
}

export default ReactHookForm;