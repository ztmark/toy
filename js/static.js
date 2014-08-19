/**
 * Created by Mark on 2014/8/19.
 */


// 点击选项
var bar ,p ;
// 判断选择是否正确
function check(a) {
    //暂停进度条
    clearInterval(bar);
    clearInterval(p);

    var ans = $('audio').data('name'); //获得正确答案
    var op = $(a).text(); //获得所选项
    var point = +$('.pointsDelta').text(); //获得当时分数
    var scoreNode = $('#score').find('span');
    var score = +scoreNode.text();//得到当前的总分数
    if(ans === op) { //判断是否正确
        //弹出正确对话框
        $('#correct-box').css('display','inherit');
        $('.label-success').text('+' +point+'pts');
        scoreNode.text(score+point);
        if(score+point > 0) { //分数大于0 设置其为绿色
            scoreNode.removeClass('negative');
        }
    } else {
        //弹出错误对话框
        $('#wrong-box').css('display','inherit');
        $('.label-error').text('-'+(150-point)+'pts');
        scoreNode.text(score-150+point);
        if(score-150+point < 0) { //分数小于0， 设置其为红色
            scoreNode.addClass('negative');
        }
    }

    // 为了 在弹出对话框后，防止鼠标与其他页面元素进行交互 设置背景图片
    $('.fancybox-overlay').css('display','block');

}


function setData(){
    var ops =[];
    var ans ;
    for (var i=0; i<4; ) {
        var tmp = Math.floor(Math.random()*songs.length);
        var cnu = false;
        for(var j=0; j<i; j++) {
            if (tmp == ops[j]) {
                cnu = true; break;
            }
        }
        if(cnu) continue;
        ops[i] = songs[tmp];
        i++;
    }
    ans = ops[Math.floor(Math.random()*4)];
    $('.box').css('display','none'); // 隐藏弹出框
    var audio = $('#music');
    audio.attr('src','music/'+ans+'.mp3');//设置歌曲
    audio.data('name',ans); //给 data-name属性设置值
    $('#box-ans').text(ans);// 给 wrong-box设置正确的答案
    var options = $('.lead');
    options.children().remove(); //清除原先的选项
    $('.fancybox-overlay').css('display','none');//隐藏 阻止鼠标与页面进行交互的 图片
    for(var i=0; i<ops.length; i++) {// 设置选项
        var opt = $('<a href="javascript:void(0)" onclick="check(this)" class="btn btn-block btn-lg btn-option"></a>');
        opt.append(ops[i]);
        options.append(opt);
    }
    //重新设置进度条和分数
    len = 400;
    point = 100;


    setProgressBar();
    setPoint();
}

var len = 400; //进度条长度
var point = 100;//分数
// 进度条缩短到0的时间应该与分数减少到0的时间差不多
//所以 400*30 约等于 100*130 因为有误差，所以不是绝对相等的，具体看效果
function setProgressBar() { // 设置进度条
    clearInterval(bar); //为了防止在下面的设置之前，清除前一次的设置，没有这句会出现，点击了选项，进度条还是走的情况
    bar = setInterval(function(){ //定时缩短进度条，每30毫秒，缩短1px
        $('#choiceProgressBar').css('width',(len--)+'px');
    },30);

}
function setPoint() { //设置分数
    clearInterval(p); //为了防止在下面的设置之前，清除前一次的设置，没有这句会出现，点击了选项，分数还是走的情况
    p = setInterval(function () { //定时减少分数，每130毫秒，分数减少1
        point--;
        var pd = $('.pointsDelta');
        pd.text(point);
        if (point <= 0) { //如果分数小于0了，则弹出错误对话框
            clear();
        }
    }, 130);

}

function clear() { //
    clearInterval(bar);
    clearInterval(p);
    $('#wrong-box').css('display','inherit');
    $('.label-error').text('-100pts');
}

// progressbar
$(document).ready(function(){
    setProgressBar();
    setPoint();
    setData();//初始化选项
    $('.nextSong').on('click',setData); //设置 下一首的 点击事件
});


