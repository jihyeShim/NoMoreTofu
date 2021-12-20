
let windowWidth;
let windowHeight;

let scrollY = 0;
let relativeScrollY = 0;
let totalScrollHeight = 0;
let currenScene = 0;
let calAnimationVal;

let prevDurations = 0;
let pixelDuration = 0;


// scene 0, 1, 2, 3, 4
let animationKeyframes = [
    { // contentsA out
        animationVal:{
            opacity:[1, 1],
            textMove:[0, 0]
        }
    },
    { // contentsB in
        animationVal:{
            opacity:[1, 1],
            textBox:[0, 0]
        }
    },
    { // contentsB out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, 0]
        }
    },
    { // contentsC in
        animationVal:{
            opacity:[1, 1]
        }
    },
    { // contentsC out
        animationVal:{
            opacity:[1, 0]
            textMove:[0, 0]
        }
    }
]

let elemBody = document.body;

function init()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    render();
    resizeHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
}

function scrollHandler()
{
    scrollY = window.pageYOffset;

    if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight))
    {
        return;
    }

    if(scrollY > pixelDuration+prevDurations)
    {
        prevDurations += pixelDuration;
        currenScene++;
    }
    else if(scrollY < prevDurations)
    {
        currenScene--;
        prevDurations -= pixelDuration;
    }

    relativeScrollY = scrollY - prevDurations;

    render(currenScene);
}

function resizeHandler()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    totalScrollHeight = 0;
    pixelDuration = windowHeight * 0.5;

    for( let i = 0; i < animationKeyframes.length; i++)
    {
        totalScrollHeight += pixelDuration;
    }
    totalScrollHeight += windowHeight;

    elemBody.style.height = totalScrollHeight + 'px';
}

function render(nowState)
{
    let targetElem = document.querySelectorAll('.container');

    switch(nowState)
    {
        case 0:{
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[0].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[0].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[0].animationVal.textMove);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 1:{
            let opacityVal, moveValA, moveValB;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[1].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[1].animationVal.imgBox);
            moveValB = calcAni(animationKeyframes[1].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateX(' + moveValA + 'px)';
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
        }break;
        case 2:{
            let opacityVal, moveValA, moveValB;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[2].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[2].animationVal.imgBox);
            moveValB = calcAni(animationKeyframes[2].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateX(' + moveValA + 'px)';
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
        }break;
        case 3:{
            let opacityVal;
            let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[3].animationVal.opacity);
            scrollAniElem[0].style.opacity = opacityVal;
        }break;
        case 4:{
            let opacityVal, moveValA, moveValB;
            let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            timeVal = calcAni(animationKeyframes[4].animationVal.time);
            scrollAniElem[0].style.transform = 'translateX(' + moveValA + 'px)';
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';

        }break;
    }
}

function calcAni(value)
{
    return( relativeScrollY / pixelDuration) * (value[1] - value[0]) + value[0];
}

init();










