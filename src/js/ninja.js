import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require("jquery.cookie");

import Ninja from './global-functions';
window.Ninja = Ninja;

const bootstrap = (window.bootstrap = require('bootstrap'));

$(function () {
    $('.form-control').each(function(){
        $(this).on('focus', function(){
            $(this).siblings('label').addClass('focused')
        });
        $(this).on('blur', function(){
            if ($(this).val() == '') {
                $(this).siblings('label').removeClass('focused')
            }
        });
    });

    $('form[name*=formMailForm] input[type="text"], textarea').each(function(){
       $(this).closest('.form-group').addClass('type-text')
    });

    $('#portfolio .project-desc').each(function(){
        var portfolioDesc = $(this),
            columnColor = $(this).closest('.column-content').css("backgroundColor");

        if (columnColor == 'rgba(0, 0, 0, 0)') {
            return
        }
        portfolioDesc.css('backgroundColor', columnColor)
    });

    Ninja.init({
        debug: false
    });
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        var navbarCollapsible = $('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.removeClass('navbar-shrink')
        } else {
            navbarCollapsible.addClass('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
