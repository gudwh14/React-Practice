import axios from "axios";
import {useEffect} from 'react';

const Cookie = () => {
    /*
        문제점 : 쿠키의 도메인이 같고 httpOnly : false 이면 document.cookie 로 읽기가능, XSS 취약점
        true 이면 못읽음
     */


    /*
        Cookie 를 받아오기 위해서 withCredentials : true 를 설정 해준다.
        httpOnly = false 일때 document.cookie 로 받은 쿠키를 읽어올수 있다.
        But, httpOnly 이면 document.cookie JS 로 쿠키를 읽을수있어 XSS 공격에 취약하다.
     */
    const getToken = async () => {
        await axios.get("http://localhost:8080/api/httpOnlyFalse",{withCredentials :true})
            .then((response)=> {
                console.log("axios : " ,document.cookie)
                console.log(response.headers);
            })
            .catch((error)=> {
                console.log(error);
            })
    }
    /*
        httpOnly = true 일때
        headers Set-Cookie 를  어떻게 get 해야할까..?
     */

    useEffect(()=> {
        getToken();
    })
    return (
        <>
        </>
    )
}
export default Cookie