$(document).ready(function() {
  $('[data-toggle=sidebar]').click(function() {
    $('.row-sidebar').toggleClass('active');

    $('#sidebar').css({'left': '-41.6%'});
    $('#sidebar').toggle();

    $('#sidebar').animate({left: '0'}, 200);
  });

  $(window).on('click', function (event) {
    var currentMode = $(window).width();
    if (currentMode < 768) {
      var target = event.target;
      var cls = $(target).attr('class');
      var role = $(target).attr('role');
      console.log(cls + ' ' + role);
      if (cls != 'navbar-toggle' && cls != 'icon-bar' && role != 'navigation') {
        $('#sidebar').hide();
      }
    } else {
      $('#sidebar').show();
    }
  });

  $(window).on('resize', function (event) {
    var currentMode = $(window).width();
    if (currentMode >= 768) {
      $('#sidebar').show();
    } else {
      $('#sidebar').hide();
    }
  });

  $('#datepicker').datepicker({});
});