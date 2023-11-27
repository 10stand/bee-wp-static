/**
 * 上传图片
 * @param ele 类名或者id
 * @param img 可选参数，是否显示图片，默认false
 * @param type 可选参数，添加自定义属性的元素以及自定义属性的名字，默认{}
 */
function upImg(ele, img = false, type = { ele: undefined, name: undefined }) {
    $(ele).click(function () {
        event.preventDefault();

        upload_frame = wp.media({
            title: '添加图片',
            button: {
                text: '选择图片',
            },
            multiple: false
        });
        var that = $(this)
        upload_frame.on('select', function () {
            attachment = upload_frame.state().get('selection').first().toJSON();
            that.find('img').attr('src', attachment.url);
            that.find('img').fadeIn();
            if (img && that.find('img').prev()[0].localName === 'span') {
                that.find('img').prev().hide()
            }
            if (type.ele && type.name) {
                let check = $(type.ele).find('input');
                check.each(function () {
                    if ($(this).is(':checked')) {
                        $(this).parent().parent().parent().data(type.name, attachment.url)
                    }
                });
            }
        });
        upload_frame.open();
    })
}

/**
 * uuid
 * @returns {string}
 */
function uuid() {
    // uuid
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    return s.join("");
}

/**
 * 上传图片特殊版
 * @param ele 类名或者id
 * @param img 可选参数，是否显示图片，默认false
 * @param type 可选参数，添加自定义属性的元素以及自定义属性的名字，默认{}
 */
function upImgSup(ele, img = false, type = { ele: undefined, name: undefined }) {
    $(ele).click(function () {
        event.preventDefault();

        upload_frame = wp.media({
            title: '添加图片',
            button: {
                text: '选择图片',
            },
            multiple: false
        });
        var that = $(this)
        upload_frame.on('select', function () {
            attachment = upload_frame.state().get('selection').first().toJSON();
            that.find('img').attr('src', attachment.url);
            that.find('img').fadeIn();
            if (img && that.find('img').prev()[0].localName === 'span') {
                that.find('img').prev().hide()
            }
            if (type.ele && type.name) {
                let check = $(type.ele).find('input');
                check.each(function () {
                    if ($(this).is(':checked')) {
                        $(this).parent().parent().parent().data(type.name, attachment.url)
                    }
                });
            }

            // 关于我们的特殊部分
            if (that.parent().children('.his_boxs').children('.active')) {
                that.parent().children('.his_boxs').children('.active').data('img', that.find('img').attr('src'))
            }
            if (that.parent().children('.abi_boxs').children('.active')) {
                that.parent().children('.abi_boxs').children('.active').data('img', that.find('img').attr('src'))
            }
            if (that.children('span').text() === '预览图' && that.children('span').next().attr('src')) {
                that.children('span').hide()
                that.children('span').next().show()
            }

            // 公司荣誉的特殊部分
            // if (that.hasClass('abo-hon-con-item-con-img')) {
            //     that.parent().data('img', that.find('img').attr('src'))
            // }
            if (that.parent().hasClass('abo-hon-con-item-con') && that.children('svg')) {
                that.parent().data('img', that.find('img').attr('src'))
                that.children('svg').css({ 'display': 'none' })
                that.children('img').css({ 'object-fit': 'center', 'width': '37px', 'height': '37px' })
            }
        });
        upload_frame.open();
    })
}