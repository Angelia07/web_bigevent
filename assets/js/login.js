$(function () {
  // 点击去注册的链接
  $('#link_reg').on('click', function () {
    $('.login_box').hide();
    $('.reg_box').show();
  })
  // 点击去登录的链接
  $('#link_login').on('click', function () {
    $('.reg_box').hide();
    $('.login_box').show();
  })
  // 通过layui获取from
  //自定义layui的验证规则
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      const pwd = $(".reg_box [name=password]").val();
      if (pwd !== value) {
        return '密码不一致'
      }

    }
  })
  // 监听form表单发起注册 的请求
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();//一定要阻止默认样式
    const username = $('#form_reg [name=username]').val();
    const password = $('#form_reg [name=password]').val();
    $.ajax({
      url: '/api/register',
      type: 'post',
      data: {
        username,
        password
      },
      // dataType:'json',
      success: function (res) {
        // console.log(res);
        if (res.status === 0) {

          layer.msg(res.message);
          $('#link_login').click();//会自己触发
        } else {
          layer.msg(res.message);
        }
      }

    })
  })
  //监听发起登录的请求
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: $(this).serialize(),
      // dataType:'json',
      success:function(res){
        console.log(res);
        if(res.status===0){
          layer.msg(res.message);
          //进行跳转
          location.href='./index.html'
          //存储token
          localStorage.setItem('token',res.token)
        }else(
          layer.msg(res.message)
        )

      }

    })

  })
})