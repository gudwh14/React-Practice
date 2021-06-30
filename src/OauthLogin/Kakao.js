import axios from "axios";

/*
    1. kakao develop API token 등록하기
    2. 플랫폼 http://localhost:3000 등록하기
    3. Redirection URL 등록하기
 */

const Kakao = () => {
    const token = '79d94d04d7c2827f0b68f05d7df6d00f'; // REST API KEY
    const redirectionURL = "http://localhost:3000/oauth"; // REDIRECT URL

    // 카카오 로그인 창으로 이동합니다.
    const callKakaoLoginHandler = () => {
        window.location.assign("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=79d94d04d7c2827f0b68f05d7df6d00f&redirect_uri=http://localhost:3000/oauth");
    }

    callKakaoLoginHandler();
    return(
        <>
            <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=79d94d04d7c2827f0b68f05d7df6d00f&redirect_uri=http://localhost:3000/oauth">로그인</a>
        </>
    )
}

export default Kakao;