var recalculateHrefs = function () {
  var key = $('#key').val();
  // All items with id of reviews or testkey
  var targets = $('#reviews').add('#testkey');
  $(targets).each(function () {
    // For each target, compute assign an href attribute.
    console.log($(this));
    var base = $(this).data('baseref');
    $(this).attr('href', base + '?key=' + key);
  })
};

$(function () {
  recalculateHrefs();
  // For every stroke or change in the textbox, re-compute the href attributes
  $('#key').on('keydown keyup change', recalculateHrefs);
});
