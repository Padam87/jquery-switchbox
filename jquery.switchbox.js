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
                    .attr({
                        id: $el.attr('id') + '_yes',
                        name: 'switchbox_' + $el.attr('name'),
                        type: 'radio',
                        value: '1',
                        class: 'switch-input',
                    })
                    .click(function() {
                        $el.prop('checked', true);
                        $no.prop('checked', false);
                    });

            var $yesLabel = $('<label></label>')
                    .attr('for', $yes.attr('id'))
                    .html(switchbox.settings.yesText)
                    .addClass('switch switch-on');

            var $no = $('<input>')
                    .attr({
                        id: $el.attr('id') + '_no',
                        name: 'switchbox_' + $el.attr('name'),
                        type: 'radio',
                        value: '0',
                        class: 'switch-input',
                    })
                    .click(function() {
                        $el.prop('checked', false);
                        $yes.prop('checked', false);
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
                $yes.prop('checked', true);
            } else {
                $no.prop('checked', true);
            }

            $el.hide();
            $el.parent().append($yesno);

            $el.bind('change', function() {
                if ($el.is(':checked')) {
                    $yes.prop('checked', true);
                    $no.prop('checked', false);
                } else {
                    $no.prop('checked', true);
                    $yes.prop('checked', false);
                }
            });
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