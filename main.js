/* 本次实现轮播思路是先将图片放于页面右侧堆叠隐藏，然后第一张图在中间规定区域显示，接着往左平移，随后进入右侧堆叠 */
let n
初始化()

setInterval(()=>{
    makeLeave(getImage(n)).one('transitionend',(e)=>{
    makeEnter($(e.currentTarget))
    })
    makeCurrent(getImage(n+1))
    n +=1
},3000)


function getImage(n){
    return $(`.images > img:nth-child(${x(n)})`)
}

function x(n) {
    console.log('x(n)中的'+n)
    if (n > 5) {
        n = n % 5
        if (n === 0) {
            n = 5
        }
        
    }// n = 1 2 3
    return n
    //对n判断整除5则为5，其他都是1%5=1,2%5=2
}
function 初始化(){
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
    //es6写法 得到${}中的值给nth-child()的括号
}

function makeCurrent($node){
    return $node.removeClass('enter leave').addClass('current')
}

function makeLeave($node){
    return $node.removeClass('current enter').addClass('leave')
}

function makeEnter($node){
    return $node.removeClass('current leave').addClass('enter')
}