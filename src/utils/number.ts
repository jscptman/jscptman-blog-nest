//生成随机数, 返回值范围: [firstNum(secondNum), secondNum(firstNum)]
export function getRandomIntInclusive(firstNum: number, secondNum: number) {
  firstNum = Math.ceil(firstNum);
  secondNum = Math.floor(secondNum);
  return Math.floor(Math.random() * (secondNum - firstNum + 1)) + firstNum;
}
