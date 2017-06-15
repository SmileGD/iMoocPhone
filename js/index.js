

var getElm=function(selector){
    return document.querySelector(selector);
}
var getAllElm=function(selector){
    return document.querySelectorAll(selector);
}
//获取元素样式
var getCls=function(element){
    return element.getAttribute("class");
}
//设置元素样式
var setCls=function(element,cls){
    return element.setAttribute("class",cls);
}
//为元素添加样式
var addCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+" "+cls);
    }
}
//为元素删除样式
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        setCls(element,baseCls.split(cls).join(" ").replace(/\s+/g," "));
    }
}



//初始化样式为init
var screenAnimateElements={
    '.screen-1':[
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow',
    ],
    '.screen-2':[
        '.screen-2_heading',
        '.screen-2_phone',
        '.screen-2_subheading',
        '.screen-2_point_i-1',
        '.screen-2_point_i-2',
        '.screen-2_point_i-3',
    ],
    '.screen-3':[
        '.screen-3_heading',
        '.screen-3_phone',
        '.screen-3_subheading',
        '.screen-3_features',
    ],
    '.screen-4':[
        '.screen-4_heading',
        '.screen-4_subheading',
        '.screen-4_type_item-i-1',
        '.screen-4_type_item-i-2',
        '.screen-4_type_item-i-3',
        '.screen-4_type_item-i-4',
    ],
    '.screen-5':[
        '.screen-5_heading',
        '.screen-5_bg',
        '.screen-5_subheading',
    ],
};
//初始化样式
var setScreenAnimateInit=function(screenCls){
    var screen=document.querySelector(screenCls);
    var animateElements=screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute("class",baseCls+" "+animateElements[i].substr(1)+"_animate_init");
    }
}

//播放动画
var playScreenAnimateDone=function(screenCls){
    var screen=document.querySelector(screenCls);
    var animateElements=screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute("class",baseCls.replace("_animate_init","_animate_done"));
    }
}
window.onload=function() {
    for (key in screenAnimateElements) {
        if(key===".screen-1"){
            continue;
        }
        setScreenAnimateInit(key);
    }
}
//滚动到哪就显示哪儿
var navItems=getAllElm(".header_nav-item");
var outlineItems=getAllElm(".outline_item");

    var switchNavItemActive=function(index){
        for(var i=0;i<navItems.length;i++){
            delCls(navItems[i],"header_nav-item_status_active");
        }
        addCls(navItems[index],"header_nav-item_status_active");
        for(var i=0;i<outlineItems.length;i++){
            delCls(outlineItems[i],"outlinre_item_status_active");
        }
        addCls(outlineItems[index],"outlinre_item_status_active");
    }
//滑动门特效
var navTip = getElm(".header_nav-tip");
var setTip = function (index, lib) {
    lib[index].onmouseover = function () {
        navTip.style.left = (index * 100) + "px";
    }
    var activeIndex = 0;
    lib[index].onmouseout = function () {
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf("header_nav-item_status_active")>-1) {
                activeIndex = i;
                break;
            }
        }
        navTip.style.left = ( activeIndex * 100) + "px";
    }
}
for (var i = 0; i < navItems.length; i++) {
    setTip(i, navItems)
}
switchNavItemActive(0);
window.onscroll=function() {
    var top = document.body.scrollTop;
    if (top > 80) {
        addCls(getElm(".header"), "header_status_black");
        addCls(getElm(".outline"), "outline_status_in");
    } else {
        delCls(getElm(".header"), "header_status_black");
        delCls(getElm(".outline"), "outline_status_in");
        switchNavItemActive(0);
        navTip.style.left = ( 0 * 100) + "px";
    }
    if (top > 0) {
        playScreenAnimateDone(".screen-1");
    }
    if (top > 800 * 1 - 150) {
        playScreenAnimateDone(".screen-2");
        switchNavItemActive(1);
        navTip.style.left = ( 1 * 100) + "px";
    }
    if (top > 800 * 2 - 150) {
        playScreenAnimateDone(".screen-3");
        switchNavItemActive(2);
        navTip.style.left = ( 2 * 100) + "px";
    }
    if (top > 800 * 3 - 150) {
        playScreenAnimateDone(".screen-4");
        switchNavItemActive(3);
        navTip.style.left = ( 3 * 100) + "px";
    }
    if (top > 800 * 4 - 150) {
        playScreenAnimateDone(".screen-5");
        switchNavItemActive(4);
        navTip.style.left = ( 4 * 100) + "px";
    }
}
//双向定位
    var setNavJump = function (i, lib) {
        var item = lib[i];
        item.onclick = function () {
            document.body.scrollTop = i * 800;
        }
    }
    for (var i = 0; i < navItems.length; i++) {
        setNavJump(i, navItems);
    }
    for (var i = 0; i < outlineItems.length; i++) {
        setNavJump(i, outlineItems);
    }

setTimeout(function(){
    playScreenAnimateDone(".screen-1");
},200)