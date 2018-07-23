function resize() {
    //if ($(window).height() < 400)
    //    $('div.contant-table').css('height', '');
    //else
    //    $('div.panel-body').css('height', ($(window).height() - $('div.navbar-fixed-top').height()) + 'px');

    if ($(window).height() < $('div.contant-table').offset().top + 300)
        $('div.contant-table').css('height', '300px');
    else if ($('div.contant-table').offset().top + $('div.contant-table').height() > $(window).height())
        $('div.contant-table').css('height', ($(window).height() - $('div.contant-table').offset().top) + 'px');
}

$(document).ready(function () {
    $(window).resize(resize);
    resize();
});