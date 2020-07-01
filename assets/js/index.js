
$(function () {
    getUserInfo();
    const layer = layui.layer;
    $('.back').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });
        // console.log('ok');
    })
})



function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                renderAvatar(res.data)
                // layui.layer.msg(res.msg)
            } else {
                layui.layer.msg(res.msg)
            }
        },
        
    })
}
function renderAvatar(user) {
    const name = user.nickname || user.username;
    //  const{username,nickname, user_pic}=user;
    $('#welcome').html('欢迎    ' + name)
    if (!user.user_pic) {
        $('.text-avatar').html(name[0].toUpperCase())
        $('.layui-nav-img').hide();
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    }

}
