/*
    redux 미들웨어 만들기
 */

// store = 리덕스 스토어 인스턴스 입니다.
// next = 액션을 다음 미들웨어에게 전달하는 함수 입니다. next(action) 형태로 사용합니다. 다음 미들웨어가 없으면 리듀서로 전달 됩니다.
// next 를 호출 하지 않는다면 액션이 무시되어 리듀서에게 전달되지 않습니다.
// action = 현재 처리하고 있는 액션 객채입니다.
const myLogger = store => next => action => {
    console.log(action);
    // 업데이트 이전 상태를 조회합니다
    console.log('\t', store.getState());

    const result = next(action);
    // store.dispatch 를 사용하면 다른 액션을 추가적으로 발생시킬수 있습니다.

    // 업데이트 이후 상태를 조회합니다
    console.log('\t', store.getState());
    return result;
}

export default myLogger;