// function block(order) 
// {
//     console.log(`${order}번째 실행`)
// }
// function nonblock(order, next) 
// {
//     let waitTime = Math.random() * 500
//     setTimeout(() => {
//         console.log(`${order}번째 실행: ${waitTime}ms`)
//         if(typeof next == "function")next()
//     },waitTime)
// }
function nonblockWithPromise(order) 
{
    return new Promise((resolve, reject)=>{
            let waitTime = Math.random() * 500
            setTimeout(() => {
                if(waitTime <= 500){
                    console.log(`${order}번째 실행: ${waitTime}ms`)
                    resolve(order)
                }
                else{
                    reject(`${order}번째 실행 시간 초과! - ${waitTime}ms`)
                }
            },waitTime)
    })
}

(async ()=>{
    for await (res of [nonblockWithPromise(3), nonblockWithPromise(2)]){
        console.log(res)
    }
})();

////async function run(){
// (async (a,b,c)=>{
//     try {
//         await nonblockWithPromise(1)
//         await nonblockWithPromise(2)
//         await nonblockWithPromise(3)
//         await nonblockWithPromise(4)
//         await nonblockWithPromise(5)
//     } catch(error){
//         console.log(error)
//     }
// })(1,2,3)

// Promise.all([
//     nonblockWithPromise(1),
//     nonblockWithPromise(2),
//     nonblockWithPromise(3)
// ]).then((res)=>{
//     console.log(res)
// }).catch((error)=>{
//     console.log(error)
// })

// nonblockWithPromise(1)
//     .then(()=>{
//         return nonblockWithPromise(2)
//     })
//     .then(()=>{
//         return nonblockWithPromise(3)
//     })
//     .then(()=>{
//         return nonblockWithPromise(4)
//     })
//     .then(()=>{
//         return nonblockWithPromise(5)
//     })
//     .then(()=>{
//         console.log("끝!")
//     })
//     .catch((error)=>{
//         console.log(error)
//     })

// const promise = new Promise((resolve, reject)=>{
//     nonblock(1, ()=>{
//         resolve([1,2,3])
//         //reject("실패")
//     })
// });

// promise
//     .then((msg)=>{
//         return new Promise((resolve, reject)=>{
//             nonblock(2, ()=>{
//                 resolve("성공")
//                 //reject("실패")
//             })
//         })
//     })
//     .then((msg)=>{
//         return new Promise((resolve, reject)=>{
//             nonblock(3, ()=>{
//                 resolve("성공")
//                 //reject("실패")
//             })
//         })
//     })
//     .then((msg)=>{
//         return new Promise((resolve, reject)=>{
//             nonblock(4, ()=>{
//                 resolve("성공")
//                 //reject("실패")
//             })
//         })
//     })
//     .then((msg)=>{
//         return new Promise((resolve, reject)=>{
//             nonblock(5, ()=>{
//                 resolve("성공")
//                 //reject("실패")
//             })
//         })
//     })
//     .then((msg)=>{
//         console.log("끝!")
//     }
//     )
//     .catch((msg)=>{
//         console.log("catch리턴값 : ",msg);
//         console.log("reject가 호출되면 실행되는 함수")
//     })
//     .finally((msg)=>{
//         console.log("finally무조건실행")
//     })

// nonblock
// (1, ()=>
//     {
//         nonblock(2, ()=>{
//             nonblock(3,()=>{
//                 nonblock(4,()=>{
//                     nonblock(5()=>{
//                         nonblock(1)})}),})})
       

//     }
// );
// console.log("끝!")


// nonblock(1);
// nonblock(2);
// nonblock(3);
// nonblock(4);
// nonblock(5);
