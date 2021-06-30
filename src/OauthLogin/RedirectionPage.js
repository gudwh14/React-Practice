import axios from "axios";
import {useEffect, useState} from 'react';

/*
    로그인 성공후 인가코드를 파싱하고 토큰정보를 받아오는 페이지 입니다.
    토큰정보 받아서 accessToken, refreshToken 을 서버에 전달해주면 됩니다.
    사용자 정보 , 로그아웃 같은 경우는 CORS 문제로 PROXY 를 사용하거나 백엔드 서버에서 처리하면 됩니다.
 */

const RedirectionPage = () => {
    const token = '79d94d04d7c2827f0b68f05d7df6d00f'; // REST API KEY
    const redirectionURL = "http://localhost:3000/oauth"; // REDIRECT URL

    // 로그인 성공시 URL 에있는 인가코드 를 파싱합니다.
    const code = new URL(window.location.href).searchParams.get('code');

    const [refreshToken, setRefreshToken] = useState();
    const [accessToken, setAccessToken] = useState();

    /*
        인가코드로 토큰 얻어오기
        Body 는 QueryString 형식으로 지정해야합니다.

     */
    const getUserToken = () => {
        const data = {
            grant_type : "authorization_code",
            client_id : token, // REST API KEY
            redirect_uri : redirectionURL, // REDIRECT URL
            code : code, // 인가코드
        }

        // 쿼리스트링으로 변환하기
        const queryStringBody = Object.keys(data)
            .map(k => encodeURIComponent(k) + "=" + encodeURI(data[k]))
            .join("&")

        // 토큰 요청하기
        axios.post("https://kauth.kakao.com/oauth/token",queryStringBody , {
            headers : {
                "Content-type" : 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then((response)=> {
                console.log(response);
                setAccessToken(()=> response.data.access_token);
                setRefreshToken(()=> response.data.refresh_token);
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    const logout = () => {
        axios.post("https://kapi.kakao.com/v1/user/logout",{
            headers: {
                Authorization : 'Bearer ${access_token}'
            }
        })
            .then((response=> {
                console.log(response);
            }))
            .catch((error) => {
                console.log(error);
            })
    }

    const getUserInfo = () => {
            axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization : 'Bearer ${access_token}'
            }
        })
            .then((response)=> {
                alert("success");
                console.log(response);
            })
            .catch((error)=> {
                alert("fail");
                console.log(error);
            })
    }

    useEffect(()=> {
        getUserToken();
    },[])

    return (
        <>
            <h1>Redirection Page</h1>
            <button onClick={logout}>로그아웃</button>
            <button onClick={getUserInfo}>사용자 정보 받아오기</button>
        </>
    )
}

export default RedirectionPage;