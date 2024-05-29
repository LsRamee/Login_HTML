let num1 = 1;
let num2 = 2;
let result = num1 + num2;
let str1 = num1 + "더하기" + num2 +'는 \'' + result + '\'입니다.';
console.log(str1); 

let str2 = `${num1+1}더하기${num2+2}는 '${result+3}'입니다.`;
console.log(str2);