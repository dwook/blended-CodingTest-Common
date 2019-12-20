## 실행방법
```
git clone https://github.com/dwook/blended-CodingTest-Common.git
cd blended-CodingTest-Common
yarn install
yarn test
```
## 문제이해
* 인자로 받은 prevState를 각각의 command 값에 따라서 nextState로 반환하는 함수를 만든다고 이해했습니다.
* $set command의 경우에, depth가 없는 상황에서는 prevState가 완전히 교체되지만, depth가 있는 객체에서는 command 값을 가지고 있는 객체를 값으로 가지고 있는 property만 교체되어야 한다고 이해했습니다.

## 문제접근
* 처음에는 prevState 전체를 clone하는 방식으로 deep update까지 해결하려고 했습니다.
* deep update가 아닌 경우에 굳이 clone 할 필요가 없어짐을 깨닫고, deep update인 경우와 아닌 경우를 분리했습니다. clone 방법도 제외시켰습니다.
* deep update가 발생하는 $set에서, $set command 값을 가지고 있는 객체까지의 가는 동안의 property name을 배열에 저장해놨다가, $set command를 통해 교체하려는 값을 변경한 뒤, 배열에 저장된 property name을 토대로 새로운 객체를 만들어서 기존 prevState에 덮어서 nextState를 만드는 방식으로 문제를 해결했습니다.
