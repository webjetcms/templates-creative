import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require("jquery.cookie");

const bootstrap = (window.bootstrap = require('bootstrap'));

$(document).ready(function() {

    console.log("Ninja is ready, mam jquery=", $, "mam bootstrap=", bootstrap);

    Ninja.init({
        debug:true
    });

    $('.pb-autoaccordion .md-accordion-header').each(function () {
        $(this).on('click', function () {
            $(this).parent().toggleClass('open');
            $(this).parent().siblings().children().next().slideUp();
            $(this).parent().siblings().removeClass('open');
            $(this).next().slideToggle();
        })
    });

    /*$('.navbar-nav .dropdown-toggle').on('click', function () {
        $(this).addClass("aaa");
        $(this).toggleClass('show');
        $(this).next().toggleClass('show');

        return false;
    });*/

    if ($('.md-tabs .tab-content .tab-pane').length > 0) {
        $('.md-tabs .tab-content .tab-pane').each(function (i) {
            $(this).attr('data-position', i);
        })
    }
    if ($('.pb-autotabs .nav-item').length > 0) {
        $('.pb-autotabs .nav-item').each(function (i) {
            $(this).find('.nav-link').attr('data-position', i);
            $(this).find('.nav-link').on('click', function () {
                var tabContentElement = $(this).closest('.tabsBox').next().find('[data-position='+$(this).data('position')+']');

                $(this).parent().siblings().find('.nav-link').removeClass('active show');
                $(this).parent().siblings().removeClass('active');

                $(this).addClass('active show');
                $(this).parent().addClass('active');

                $(this).closest('.tabsBox').next().find('.tab-pane').removeClass('active show');
                tabContentElement.addClass('show active');

                return false
            })
        })
    }

    $(document).on('click', '.pb-autotabs .nav-item .nav-link', function () {
        var tabHref = $(this).attr('href');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.nav-link').removeClass('active show');
        $(this).addClass('active show');
        $(this).parent().addClass('active');
        $(this).closest('.tabsBox').next().find('.tab-pane').removeClass('active show');
        $(this).closest('.tabsBox').next().find(tabHref).addClass('active show');

        return false
    });

});
