import * as $ from 'jquery';

$(document).ready(function() {
    /* main menu toggle functionality */
    $('#menu-toggle').click(function() {
        $('#menu-icon').toggleClass('toggle');
        $('#menu > .nav-item').toggleClass('open');
        $('.nav-sub').removeClass('open'); // close sub-menu on toggle of main menu
        $('.sub-parent > a').removeClass('active'); // remove active class from sub-menu on toggle of main menu
        return false;
    });

    /* sub-menu toggle functionality */
    $('.sub-parent > a').click(function() {
        $(this).next('ul').toggleClass('open');
        $('.sub-parent > a').toggleClass('active');
        return false;
    });

    /* close menus on click outside menu */
    $(document).mouseup(function(e) { 
        if ($(e.target).closest('nav').length === 0) { 
            $('#menu-icon').removeClass('toggle');
            $('#menu > .nav-item').removeClass('open');
            $('.nav-sub').removeClass('open');
            $('.sub-parent > a').removeClass('active');
            return false; 
        } 
    });

    /* close menus on browser resize */
    $(function() {
        var $window = $(window);
        $window.on('resize', function() {
            $('#menu-icon').removeClass('toggle');
            $('#menu > .nav-item').removeClass('open');
            $('.nav-sub').removeClass('open');
            $('.sub-parent > a').removeClass('active');
            return false;
        });
    });
});