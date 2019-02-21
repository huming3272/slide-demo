/*此次轮播主要把原来的几幅图片尾clone后放在第一幅图片的头，头clone后放在最后一个图片的尾，
轮播的时候在极限边界的图点下一个时，展示clone的图片来过渡，然后图片回到和clone图对应的位置造成首尾能轮播的假象*/
let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform: 'translateX(-400px)'})

bindEvents()
 
$(next).on('click', function(){
    goToSlide(current + 1)
    console.log('next')
})
$(previous).on('click', function(){
    goToSlide(current - 1)
    console.log('pre')
})
 

let timer = setInterval(function(){
    goToSlide(current + 1)
    console.log('timer')
}, 2000)
$('.container').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide(current + 1)
    }, 2000)
})
 
function bindEvents() {
    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index) //绑定按钮的索引，并把值给goToSlide函数
        console.log('bindEvents')
         
    })
}
//重要
function goToSlide(index) {
    //边界时可以使按钮对应数值大于图片数时到最小，小于最小值的时候变最大，算是首尾交换了

    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    // console.log('current', 'index')
    // console.log(current, index)
    if (current === $buttons.length - 1 && index === 0){
        //最后一张到第一张
        console.log('here')
        $slides.css({
                transform: `translateX(${-($buttons.length + 1)*400}px)`})
            .one('transitionend', function(){
                $slides.hide()
                $slides.offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
                $slides.css({
                    transform: `translateX(${-(index+1)*400}px)`
                }).show()
                console.log('过渡')
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $slides.css({transform: `translateX(0px)`})
        .one('transitionend', function () {
            $slides.hide()
            $slides.offset()
            $slides.css({
                transform: `translateX(${-(index+1)*400}px)`
            }).show()
        })
    } else {
        $slides.css({
            transform: `translateX(${-(index+1)*400}px)`
        })
    }
    current = index

}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true) //clone(true)是询问是否连子属性一起拷贝
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    
    $slides.append($firstCopy) //element.append(element)在元素头加一个元素
    $slides.prepend($lastCopy) //element.prepend(element)在元素尾加一个元素
}