;(function(factory){
    var root =this,Kub = root.Kub = root.Kub ? root.Kub : {};
    Kub.Dialog = factory(root);
}(function(root){
    $(function(){
        $('body').append("<style type=\"text/css\">.ui-dialog{position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,0.5);z-index:1000}.ui-dialog .dialog{background:#F9F9F9;border-radius:.6875rem;min-width:14.0625rem;display:inline-block;position:fixed;left:50%;top:50%;-webkit-transform:translate(-50%, -50%)}.ui-dialog .dialog .title{text-align:center;padding:.8125rem 1.28125rem;line-height:150%;font-size:1.3rem;color:#000;white-space:nowrap}.ui-dialog .dialog .text{border:solid 1px #ccc;border-radius:.1875rem;height:1.25rem}.ui-dialog .dialog .btn-container{display:-webkit-box;display:flex;height:2.25rem;border-top:solid 1px rgba(222,222,222,0.7)}.ui-dialog .dialog .btn-container button{display:block;-webkit-box-flex:1;flex:1;outline:0;background:#F9F9F9;border:0;border-bottom-right-radius:.6875rem;color:#FB6C85;font-size:.9375rem}.ui-dialog .dialog .btn-container button:first-child{border-bottom-left-radius:.6875rem}.ui-dialog .dialog .btn-container button:last-child{border-bottom-right-radius:.6875rem}.ui-dialog .dialog .btn-container button:nth-child(2){border-left:solid 1px rgba(222,222,222,0.7)}.ui-dialog .dialog .btn-container button:disabled{color:#999}.ui-dialog.hide{-webkit-animation:ui-dialog-hide .5s linear;-webkit-animation-fill-mode:forwards}@keyframes ui-dialog-hide{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes ui-dialog-hide{0%{opacity:1}100%{opacity:0}}</style>");
    });

    var Dialog = function(config){
        config = config || {};

        var defaultConfig = {
            dialogTpl:"<div class=ui-dialog>\n    <div class=\"dialog J_dialog\">\n        <div class=\"title J_title\">\n            确定要删除此照片吗,are you sure?<br>sdfsdfdddd\n        </div>\n    </div>\n</div>",
            title:'',
            className:'',
            btns:[
                {
                    "text":"取消",
                    "className":"J_close"
                },
                {
                    "text":"确定",
                    "className":""
                }
            ],
            funs:[function(){}],

            closeback:function(){}
        };


        //如果指定了tpl,那么btns必须为空,因为使用了指定模板就没必要生成btns
        if(config.dialogTpl){
            config.btns = [];
        }


        //如果config是字符串,使用alert模式
        if(Object.prototype.toString.call(config)==='[object String]'){
            config = {
                title:config,
                btns:[],
                className:'alert'
            }

            setTimeout(function(){
                this.hide();
            }.bind(this),2000);
        }

        this.config = $.extend(defaultConfig,config,true);
        this.$body = $('body');

        this.dialog();

        return this;
    };


    Dialog.prototype.dialog = function(){
        this.$tpl = $(this.config.dialogTpl);

        if(this.config.className){
            this.$tpl.addClass(this.config.className);
        }

        this.config.title && this.$tpl.find('.J_title').html(this.config.title);
        this._init();
        return this;
    };


    Dialog.prototype.remove = function(){
        this.$tpl.remove();
        return this;
    };

    Dialog.prototype.hide = function(delay){
        var self = this;
        setTimeout(function(){
            self.$tpl.addClass('hide');
            setTimeout(function(){
                self.remove();
            },500);
        },delay);

        return this;
    };

    Dialog.prototype._init = function(){
        this._createBtn();
        this.$body.append(this.$tpl);

        //设置高度
        this.$tpl.height(document.body.scrollHeight);

        this._bindFuns();
        this._bindClose();
    };

    Dialog.prototype._createBtn = function(){
        if(!this.config.btns || !this.config.btns.length){
            return '';
        }

        var self = this,
            tempEl = $('<div class="btn-container J_btn-container">');

        self.$tpl.find('.J_dialog').append(tempEl);

        this.config.btns.forEach(function(item){
            var el = $('<button class="'+item.className+' J_fun">'+item.text+'</button>');
            item.fun && el.click(function(target){
                item.fun(target);
            });

            tempEl.append(el);
        });
    };

    Dialog.prototype._bindFuns = function(){
        var funs = this.config.funs;

        if(!funs || !funs.length){
            return false;
        }

        var len = funs.length;
        this.$tpl.find('.J_fun').each(function(index){
            if(index<len){
                $(this).click(function(target){
                    funs[index](target);
                })
            }
        });
    };

    Dialog.prototype._bindClose = function(){

        var closeBack =this.config.closeback,
            self = this;

        this.$tpl.find('.J_close').on('click',function(){
            if(closeBack){
                if(closeBack()!==false){
                    self.$tpl.remove();
                }
            }else{
                self.$tpl.remove();
            }

        })
    };

    return Dialog;

}));

