function animate(obj, target, callback) {
    // console.log(callback);
    //当不断点击按钮时，这个元素的速度会越来越快，because开启了多个定时器  让元素只有一个定时器就可以了          
    clearInterval(obj.timer); //先清除以前的定时器 只保留当前的定时器
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        var step = (target - obj.offsetLeft) / 10;
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //把步长值改为整数 不要出现小数的问题
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback(); //且 只有前一个为真才看后面一个
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}