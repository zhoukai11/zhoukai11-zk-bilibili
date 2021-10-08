window.addEventListener('load', function() {
    //获取元素 右侧轮播图
    var left = document.querySelector('.lunbo-left');
    var left_ul_lis = document.querySelector('.lunbo-left ul').querySelectorAll('li');
    var left_ul = document.querySelector('.lunbo-left ul');
    var left_ol = document.querySelector('.circle');
    var left_img_width = document.querySelector('.lunbo-left img').offsetWidth;
    //鼠标经过
    left.addEventListener('mouseenter', function() {
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    //鼠标离开
    left.addEventListener('mouseleave', function() {
        timer = setInterval(function() {
            //手动调用点击事件
            move();
        }, 5000);
    });
    var num = 0,
        circle = 0;
    //动态的生成小圆圈 有几张图就有几个小圆圈
    for (var i = 0; i < left_ul_lis.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        left_ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < left_ol.children.length; i++) {
                left_ol.children[i].className = '';
            }
            this.className = 'current';
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            animate(left_ul, -index * left_img_width);
            num = circle = index;
        })
    }
    // 把ol里面的第一个小li的类名设为current
    left_ol.children[0].className = 'current';
    // 克隆第一张图片（li）放到ul最后面
    var first = left_ul.children[0].cloneNode(true);
    left_ul.appendChild(first);

    //自动播放
    var timer = setInterval(function() {
        //手动调用点击事件
        move();
    }, 5000);

    function move() {
        if (num == left_ul.children.length - 1) {
            left_ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(left_ul, -num * left_img_width);
        // 小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle++;
        circle = circle == left_ol.children.length ? 0 : circle;
        circleChange();
    }

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < left_ol.children.length; i++) {
            left_ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        left_ol.children[circle].className = 'current';
    }
    //获取元素 左侧轮播图
    var right = document.querySelector('.lunbo-right');
    var btn_left = document.querySelector('.btn_left');
    var btn_right = document.querySelector('.btn_right');
    var big = document.querySelector('.big');
    var video_width = document.querySelector('.video_list').offsetWidth;
    // console.log(video_width);
    //鼠标经过
    right.addEventListener('mouseenter', function() {
        btn_left.style.display = 'block';
        btn_right.style.display = 'block';
    });
    //鼠标离开
    right.addEventListener('mouseleave', function() {
        btn_left.style.display = 'none';
        btn_right.style.display = 'none';
    });
    // 克隆第一组图片放到最后面
    var first = big.children[0].cloneNode(true);
    big.appendChild(first);
    // 点击右侧按钮，滚动一组
    var num1 = 0;
    //右按键
    btn_right.addEventListener('click', function() {
        if (num1 == big.children.length - 1) {
            big.style.left = 0;
            num1 = 0;
        }
        num1++;
        animate(big, -video_width * num1);
    });
    // 左按钮
    btn_left.addEventListener('click', function() {
        if (num1 == 0) {
            num1 = big.children.length - 1;
            big.style.left = -num1 * video_width + 'px';
        }
        num1--;
        animate(big, -video_width * num1);
    });
})