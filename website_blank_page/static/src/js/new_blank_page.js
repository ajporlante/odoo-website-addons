odoo.define('website_blank_page.new_blank_page', function (require) {
'use strict';

// Based on website/static/src/js/menu/new_content.js

var core = require('web.core');
var wUtils = require('website.utils');
var WebsiteNewMenu = require('website.newMenu');
var qweb = core.qweb;

var _t = core._t;

WebsiteNewMenu.include({
    _createNewPage: function () {
        wUtils.prompt({
            id: 'editor_new_page',
            window_title: _t("New Page"),
            input: _t("Page Title"),
            init: function () {
                var $group = this.$dialog.find('div.form-group');
                $group.removeClass('mb0');

                var $add = $('<div/>', {'class': 'form-group mb0'})
                            .append($('<span/>', {'class': 'col-sm-offset-3 col-sm-9 text-left'})
                                    .append(qweb.render('web_editor.components.switch', {id: 'switch_addTo_menu', label: _t("Add page in menu")}))
                                    .append(qweb.render('web_editor.components.switch', {id: 'switch_blank', label: _t("Remove header and footer")})));
                $add.find('input#switch_addTo_menu').prop('checked', true);
                $group.after($add);
            }
        }).then(function (val, field, $dialog) {
            if (val) {
                var url = '/website/add/' + encodeURIComponent(val);
                var add_menu = $dialog.find('input[id="switch_addTo_menu"]').is(':checked');
                var blank = $dialog.find('input[id="switch_blank"]').is(':checked');
                if (add_menu) {
                    url +='?add_menu=1';
                    if (blank) {
                        url +='&template=website_blank_page.default_blank_page';
                    }
                } else if (blank) {
                    url +='?template=website_blank_page.default_blank_page';
                }
                document.location = url;
            }
        });
    },
});
});