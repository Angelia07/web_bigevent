$(function () {
    const form = layui.form;
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    // $('.layui-form  [name=username]').val(res.data.username)
                    // $('.layui-form  [name=nickname]').val(res.data.nickname)
                    // $('.layui-form  [name=email]').val(res.data.email)

                    form.val('formUserInfo', res.data)

                } else {
                    layer.msg(res.msg)
                }
            }

        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })


    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize().split('&');
        data.splice(1, 1)
        data = data.join('&')
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data,
            success: function (res) {
                console.log(res);
                if(res.status===0){
                    layer.msg(res.msg)
                    //调用父元素里的获取用户信息的方法.
                    window.parent.getUserInfo();
                }else{
                    layer.msg(res.msg)
                }
            }

        })
    })
})


// let arr = [1, 2, 3, 4, 5];
// console.log(arr.splice(2, 3));//返回被删除的数
// console.log(arr);