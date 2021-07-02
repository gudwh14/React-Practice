/*
    Generator 문법
    특정 구간에 멈춰놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있습니다.
    그리고 결과값을 여러번 반환 할 수도 있습니다.

    Generator.prototype.next()
    yield 표현을 통해 yield 된 값을 반환합니다.
    Generator.prototype.return()
    주어진 값을 반환하고 생성기를 종료합니다.
    Generator.prototype.throw()
    생성기로 에러를 throw 합니다.
 */

/*
    여러 값을 리턴하지만 이함수를 실제로 호출하게 되면 무조건 1 을 리턴하게 된다.
 */
function weirdFunction () {
    return 1;
    return 2;
    return 3;
    return 4;
    return 5;
}

/*
    function* 키워드를 통해 제너레이터 함수를 생성 할 수 있다.
    제너레이터 함수를 사용하면 값을 순차적으로 반환 할 수 있다 .
    함수의 흐름을 멈추고 나중에 이어서 진행 할 수 있다.
 */

function* generatorFunction() {
    console.log("제너레이터 함수 입니다");
    yield 1;
    console.log("next() 함수 yield 값을 반환합니다");
    yield 2;
    console.log("function*");
    yield 3;
    return 4;
}

const generator = generatorFunction();
generator.next();

/*
    next() 호출할때 인자를 전달하여 제너레이터 함수 내부에서 사용 할 수 있다.
 */
function* sumGenerator() {
    console.log("sumGenerator Start");
    yield ;
    console.log("어디까지 실행?");
    let a = yield;
    console.log("a 값 저장");
    let b = yield;
    console.log("b 값 저장");
    yield a + b;
}

const sum = sumGenerator();

/*
    제너레이터로 모니터링 하기
 */
function* watchGenerator() {
    console.log("Start Monitor");
    while (true) {
        const action = yield ;
        if(action.type ==='HELLO') {
            console.log("안녕하세요.");
        }
        if(action.type ==='BYE') {
            console.log("안녕히 가세요.")
        }
    }
}
const watch = watchGenerator();