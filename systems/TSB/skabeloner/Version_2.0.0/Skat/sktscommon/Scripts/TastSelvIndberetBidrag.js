$(document).ready(function() {

  $('.skts-foldet-element-step1').addClass('skts-visualhidden');

  $("#skts-bornebidrag").off();
  $("#skts-bornebidrag").on("click", function() {
    $.showSpecific($(this));
    if($(this).hasClass('skts-initier-step1'))
      $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
  });
  $("#skts-bornebidrag").keypress(function(e) { 
    if(e.which == 13) {
      $.showSpecific($(this));
      if($(this).hasClass('skts-initier-step1'))
        $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
      e.preventDefault();
    }
  });
  if($('#skts-bornebidrag').is(':checked')) {
    $.showSpecific($('#skts-bornebidrag'));
    if($('#skts-bornebidrag').hasClass('skts-initier-step1'))
      $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
  }

  $("#skts-aegtefaellebidrag").off();
  $("#skts-aegtefaellebidrag").on("click", function() {
    $.showSpecific($(this));
    if($(this).hasClass('skts-initier-step1'))
      $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
  });
  $("#skts-aegtefaellebidrag").keypress(function(e) { 
    if(e.which == 13) {
      $.showSpecific($(this));
      if($(this).hasClass('skts-initier-step1'))
        $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
      e.preventDefault();
    }
  });

  $("#skts-aftaegtsydelse").off();
  $("#skts-aftaegtsydelse").on("click", function() {
    $.showSpecific($(this));
    if($(this).hasClass('skts-initier-step1'))
      $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
  });
  $("#skts-aftaegtsydelse").keypress(function(e) { 
    if(e.which == 13) {
      $.showSpecific($(this));
      if($(this).hasClass('skts-initier-step1'))
        $('.skts-foldet-element-step1').removeClass('skts-visualhidden');
      e.preventDefault();
    }
  });

  $("#skts-ikke-cpr-barn").on("click", function() {
    $("#skts-cprnr-barn").prop('disabled', $(this).is(":checked"));
  });
  $("#skts-ikke-cpr-modt").on("click", function() {
    $("#skts-cprnr-modt").prop('disabled', $(this).is(":checked"));
  });

  $('#skts-delafaaret').on('click', function() {
    $('#skts-indberet-beloeb').slideDown();
  });
  $('#skts-delafaaret').on('keypress', function(e) { 
    if(e.which == 13) {
      $('#skts-indberet-beloeb').slideDown();
      e.preventDefault();
    }
  });

  $('#skts-engangsbeloeb').on('click', function() {
    $('#skts-indberet-beloeb').slideUp();
  });

  $('#skts-heleaaret').on('click', function() {
    $('#skts-indberet-beloeb').slideDown();
  });

  // Override TastSelvMain.js
  // Oversigt: do click event handler on each td except tooltip td.
  $('.skts-vis-mere').each(function() {
    var children = $(this).children('td');
    if(children.length > 0) {
      $(this).off("click", null);
      children.each(function(i) {
        if(i !== 4)
          $(this).on('click', function() {
            $.foldIt($(this).closest('tr'));
          });
      });
    }
  });

  var browser = $.getIEVersion();

  if(browser.is_ie && browser.version <= 8)  {
    // set up a table row for ie <= 8
    // only do this for folding tables
    $('.skts-vis-mere').each(function() {
      var el = $(this);
      if(el.get(0).tagName.toUpperCase() === "tr".toUpperCase())
        if(!el.next().hasClass('skts-fold')) {
          var tdc = el.children('td').length - 1;
          var elem = el.children('table.skts-layout2-table td:first-child + td + td + td + td + td');
          // remove all 'old' fold stuff from td and wrap in a tr for ie to display
          elem.removeClass('skts-visualhidden').removeClass('skts-fold').attr('colspan', tdc).show().wrap('<tr></tr>');
          var tr = elem.parent();
          // add the folding logic to the tr instead
          tr.addClass('skts-visualhidden').addClass('skts-fold').addClass('skts-ie-row').hide();
          el.after(tr);
        }
    });
    // HACK: arrows not aligned in IE, focus the body to make them reappear
    $('body').focus();
  }

  $("#skts-indbetalingsdato").datepicker();

});

