function solution(s = "abced") {
  let odd = s.length % 2 === 0;
  let mid = Math.floor(s.length / 2);
  console.log(mid);
  let answer = !odd ? s[mid] : s[mid] + s[mid - 1];
  return answer;
}

console.log(solution());
