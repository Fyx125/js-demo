
//判断是pc端还是移动端
function isMobile() {
    var Agents=["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag=false;
    for (var v = 0; v < Agents.length; v++) {
        if (navigator.userAgent.indexOf(Agents[v]) > 0) {
            flag = true;  //是手机端
            break;
        }
    }
    return flag
}