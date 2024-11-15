function solution(n) {
  let answer = 0;
  let temp = n.split("");
  console.log(temp);
  temp.forEach((value) => {
    answer += Number(value);
  });

  return answer;
}

console.log(solution("123"));
