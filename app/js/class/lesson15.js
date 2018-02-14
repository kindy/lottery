{
    // genertaor基本定义
    let tell=function* (){
        yield 'a';
        yield 'b';
        return 'c'
    };

    let k=tell();

    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
}

{322222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    let obj={};
    obj[Symbol.iterator]=function* (){
        yield 1;
        yield 2;
        yield 3;
    }

    for(let value of obj){
        console.log('value',value);
    }
}

{
    let state=function* (){
        while(1){
            yield 'A';
            yield 'B';
            yield 'C';
        }
    }
    let status=state();
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
}

// {
//   let state=async function (){
//     while(1){
//       await 'A';
//       await 'B';
//       await 'C';
//     }
//   }
//   let status=state();
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }

//前端对抽奖次数限制的做法
{
    let draw = function(count){
        //具体抽奖逻辑
        console.log(`剩余${count}次`);
    }

    let residue = function*(count){
        while(count>0){
            count--;
            yield draw(count);
        }
    }

    let star = residue(5);
    let btn = document.createElement('button');
    btn.id='start';
    btn.textContent='抽奖';
    document.body.appendChild(btn);
    document.getElementById('start').addEventListener('click',function(){
        star.next();
    },false)
}
//长轮询的应用，实时取到服务端的数据
{
    let ajax = function *() {
        yield new Promise(function (resolve,reject) {
            setTimeout(function () {
                resolve({code:0})
            },200);
        })
    }

    let pull =function () {
        let generator = ajax();
        let step = generator.next();
        step.value.then(function (d) {
            if(d.code!=0){
                setTimeout(function () {
                    console.info('wait');
                    pull();
                },1000);
            }else{
                consol.info(d);
            }
        })
    }
    pull();
}
