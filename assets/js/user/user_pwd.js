$(function(){
    const form=layui.form;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,

              //下面的形参value是把newPwd用到那个input框上,就是那个input框的value值
          newPwd:function(value){
              if(value===$('[name=oldPwd]').val()){
                    return '新旧密码不能一致'
              }

          },
          rePwd:function(value){
             if(value!==$('[name=newPwd]').val()){
                 return '确认密码有误,请重新输入'
             }
          }

    })
    //监听form表单的提交事件
    $('.layui-form').on('submit',function(e){
    
       e.preventDefault();
     const dataArr=  $(this).serialize().split('&')
     dataArr.length=2;
     console.log(dataArr);
       $.ajax({
           type:'post',
           url:'/my/updatepwd',
           data:dataArr.join('&'),
           success:function(res){
            if(res.status===0){
                layer.msg(res.message)
                $(".layui-form")[0].reset();
            }else{
                layer.msg(res.message)
            }
           }
       })
    })
})