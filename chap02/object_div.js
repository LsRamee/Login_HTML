const candyMachine = {
    status: {
        name:'node',
        count: 5
    },
    item: {
        price:500,
        flavor:'sweet'
    }
}

let getCount1 = function(count){
    console.log(`${count}개 생산중...`);
}


let getCount2 = function({status:{count}}){
    console.log(`${count}개 생산중...`);
}

getCount1(candyMachine.status.count)
getCount2(candyMachine)