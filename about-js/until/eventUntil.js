

//事件的一些兼容处理  兼容ie低版本
var eventUntil={
    /**
     * 事件绑定兼容处理
     * @param ele  事件节点（要操作的对象）
     * @param type  事件类型
     * @param fn   执行函数
     */
    addEvent:function (ele,type,fn) {
        if (ele.addEventListener) {   //非ie
            ele.addEventListener(type,fn,false);  //false默认为冒泡流  true的话为捕获流
        }else if(ele.attachEvent){   // ie
            ele.attachEvent("on"+type,fn);
        }else{   //兼容
            ele["on"+type]=fn;
        }
    },
    /**
     * 事件解绑兼容处理
     * @param ele  事件节点（要操作的对象）
     * @param type  事件类型
     * @param fnName  执行函数名称
     */
    removeEvent:function (ele, type, fnName) {
        if (ele.removeEventListener) {   //非ie
            ele.removeEventListener(type,fnName);
        }else if(ele.detachEvent){ //ie
            ele.detachEvent("on"+type,fnName);
        }else{ //兼容
            ele["on"+type]=fnName;
        }
    },
    /**
     * 事件对象兼容
     * @param event
     */
    getEvent:function (event) {
        return event ? event : window.event;
    },
    /**
     * 事件目标对象兼容
     * @param event  经过上面事件对象兼容处理过的
     */
    getTarget:function (event) {
        return event.target || event.srcElement;
    },
    /**
     * 阻止默认行为兼容
     * @param event  经过上面事件对象兼容处理过的
     */
    myPreventDefault:function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    /**
     * 阻止事件流兼容
     * @param event 经过上面事件对象兼容处理过的
     */
    myStopPropagation:function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    }
};