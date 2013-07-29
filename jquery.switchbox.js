;(function($) {
    $.switchbox = function(el, options) {
        var defaults = {
            yesText: '✓',
            noText: '✗'
        };

        var switchbox = this;

        switchbox.settings = {};

        var init = function() {
            switchbox.settings = $.extend({}, defaults, options);

            var $el = $(el);

            var $yes = $('<input>')
                    .attr('id', $el.attr('id') + '_yes')
                    .attr('name', $el.attr('name') + '_yesno')
                    .attr('type', 'radio')
                    .attr('value', '1')
                    .addClass('switch-input')
                    .click(function() {
                        if ($(this).attr('checked') != $el.attr('checked')) {
                            $el.click();

                            $no.removeAttr('checked');
                        }
                    });

            var $yesLabel = $('<label></label>')
                    .attr('for', $yes.attr('id'))
                    .html(switchbox.settings.yesText)
                    .addClass('switch switch-on');

            var $no = $('<input>')
                    .attr('id', $el.attr('id') + '_no')
                    .attr('name', $el.attr('name') + '_yesno')
                    .attr('type', 'radio')
                    .attr('value', '0')
                    .addClass('switch-input')
                    .click(function() {
                        if ($(this).attr('checked') != $el.attr('checked')) {
                            $el.click();

                            $yes.removeAttr('checked');
                        }
                    });

            var $noLabel = $('<label></label>')
                    .attr('for', $no.attr('id'))
                    .html(switchbox.settings.noText)
                    .addClass('switch switch-off');

            var $yesno = $('<p></p>')
                    .addClass('switchbox')
                    .append($yes)
                    .append($yesLabel)
                    .append($no)
                    .append($noLabel);

            if ($el.is(':checked')) {
                $yes.attr('checked', 'checked');
            } else {
                $no.attr('checked', 'checked');
            }

            $el.hide();
            $el.parent().append($yesno);
        };

        init();
    };

    $.fn.switchbox = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('switchbox')) {
                var switchbox = new $.switchbox(this, options);
                $(this).data('switchbox', switchbox);
            }
        });
    };

})(jQuery);