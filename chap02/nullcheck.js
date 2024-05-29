function print(num){
    if(num === undefined || num === null) num =5;
    console.log(num ?? 5)
}

print(0)