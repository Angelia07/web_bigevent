$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //实现点击上传,自动触发file 的input的点击事件
    $(".upload-btn").on('click', function (e) {
        e.preventDefault();
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        // console.log(e);
        const fileList = e.target.files;
        // console.log(fileList);
        // console.log(fileList[0]);
        if (fileList.length !== 1) {
            layui.layer.msg('请选择照片!')
        } else {
            const url = URL.createObjectURL(fileList[0]);
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', url) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        }
    })
    //为确定按钮绑定点击事件
    $(".sureBtn").on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        console.log(dataURL);

        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // debugger
                console.log(res);
                if (res.status === 0) {
                    layui.layer.msg(res.message)
                    window.parent.getUserInfo();
                } else {
                    layui.layer.msg(res.message)
                }
            }

        })
    })




})