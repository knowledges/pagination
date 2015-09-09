/**
 * Created by qbl on 2015/9/9.
 */
(function($){
    /**
     * ��ҳ��ʽ
     I. 1 2 3 4 5 6 7 8 9... 12
     II. 1 2 ...5 6 7 8 9 ... 11 12
     III. 1 2 ....5 6 7 8 9 10 11 12
     * @param opt
     * @returns {*}
     */
    $.fn.pagging = function(opt){
        var defaults = {
            current: 1,
            pagesize: 10,
            sum: 0,
            param: {},
            callback: null
        };

        var options = $.extend(defaults, opt || {});

        return this.each(function(){
            $self = $(this);
            //��ҳ��
            var totalpages = Math.ceil(options.sum/options.pagesize),
                //ͷ
                header = 2,
                //β
                tail = 2,
                //Ĭ������
                pager_length  =11,
                //��ҳ�м�ֵ
                offset = (pager_length - 1 )/ 2,
                //��ҳ�м���ʾ����
                main_length = pager_length - header - tail;

            var html = [];

            html.push('<ul class="pagination">');
            if (totalpages ===0 || totalpages ===1) {
                html.push('<li class="disabled">');
                html.push('<a href="javascript:;;" aria-label="Previous">');
                html.push('<span aria-hidden="true">&laquo;</span>');
                html.push('</a>');
                html.push('</li>');
                html.push('<li class="active"><a href="javascript:;;">1</a></li>');
                html.push('<li class="disabled">');
                html.push('<a href="javascript:;;" aria-label="Next">');
                html.push('<span aria-hidden="true">&raquo;</span>');
                html.push('</a>');
                html.push('</li>');
            }else {
                html.push('<li ' + (options.current <= 1 ? 'class="disabled" data-idx="-1"' : 'data-idx="' + (options.current - 1)) + '"' + '>');
                html.push('<a href="#" aria-label="Previous">');
                html.push('<span aria-hidden="true">&laquo;</span>');
                html.push('</a>');
                html.push('</li>');

                if (totalpages > pager_length) {
                    if (options.current <= offset + 1) {
                        for(var i = 1 ; i<= header + main_length ; i++ ){
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"' )+ '><a href="#">' + i + '</a></li>');
                        }
                        html.push('	<li class="disabled" data-idx="-1"><a href="javascript:;;">...</a></li>');
                        for (var i = totalpages - tail +1; i <= totalpages; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"' )+ '><a href="#">' + i + '</a></li>');
                        }

                    }else  if (options.current >= totalpages - offset){
                        for (var i = 1; i <= header; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"' )+ '><a href="#">' + i + '</a></li>');
                        }
                        html.push('	<li class="disabled" data-idx="-1"><a href="javascript:;;">...</a></li>');
                        for (var i = totalpages- main_length; i <= totalpages; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"' )+ '><a href="#">' + i + '</a></li>');
                        }
                    }else {
                        for (var i = 1; i <= header; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"') + '><a href="#">' + i + '</a></li>');
                        }
                        html.push('	<li class="disabled" data-idx="-1"><a href="javascript:;;">...</a></li>');

                        var offset_m = (main_length - 1) / 2;
                        var counter = options.current + offset_m;
                        for (var i = offset_m+1; i <= counter  ; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"') + '><a href="#">' + i + '</a></li>');
                        }
                        html.push('	<li class="disabled" data-idx="-1"><a href="javascript:;;">...</a></li>');
                        for (var i = (totalpages-tail)+1; i <= totalpages; i++) {
                            html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"') + '><a href="#">' + i + '</a></li>');
                        }
                    }
                }else{
                    for (var i = 1; i <= totalpages; i++) {
                        html.push('	<li ' + (options.current == i ? 'class="active" data-idx="' + i + '"' : 'data-idx="' + i + '"' )+ '><a href="#">' + i + '</a></li>');
                    }
                }

                html.push('	<li ' + (options.current >= totalpages ? 'class="disabled" data-idx="-1"' : 'data-idx="' + (options.current + 1)) + '"' + '>');
                html.push('		<a href="#" aria-label="Next">');
                html.push('			<span aria-hidden="true">&raquo;</span>');
                html.push('		</a>');
                html.push('	</li>');
            }
            html.push('</ul>');

            $self.html(html.join(''));

            if ($.isFunction(options.callback)) {
                $self.find('ul > li').click(function() {
                    var idx = $(this).data('idx');
                    if (idx!=-1) {
                        options.callback(idx,{});
                    }
                });
            }
        });
    }
})(jQuery);
