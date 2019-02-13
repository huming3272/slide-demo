/* 本次实现轮播思路是先将图片放于页面右侧堆叠隐藏，然后第一张图在中间规定区域显示，接着往左平移，随后进入右侧堆叠 */
$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')
$('.images > img:nth-child(3)').addClass('enter')
$('.images > img:nth-child(4)').addClass('enter')
$('.images > img:nth-child(5)').addClass('enter')
let n = 1

setInterval(()=>{
    $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
    //`.images > img:nth-child(${x(n)})`
    .one('transitionend', (e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    console.log('函数1 x(n):' + x(n))
    $(`.images > img:nth-child(${x(n + 1)})`).removeClass('enter').addClass('current')
    //`.images > img:nth-child(${x(n+1)})`
    n += 1
    //es6写法 得到${}中的值给nth-child()的括号
    console.log('函数2 x(n):' + x(n))
    console.log('setInterval的n'+n)
}, 3000)

function x(n) {
    console.log('x(n)中的'+n)
    if (n > 5) {
        n = n % 5
        if (n === 0) {
            n = 5
        }
        
    }// n = 1 2 3
    return n
}
