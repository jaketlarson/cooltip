$(function() {
  $("a#demo-direction-top-align-default").cooltip({
    direction: 'top'
  });
  $("a#demo-direction-top-align-right").cooltip({
    direction: 'top',
    align: 'right'
  });
  $("a#demo-direction-top-align-left").cooltip({
    direction: 'top',
    align: 'left'
  });
  $("a#demo-direction-right-align-default").cooltip({
    direction: 'right'
  });
  $("a#demo-direction-right-align-top").cooltip({
    direction: 'right',
    align: 'top'
  });
  $("a#demo-direction-right-align-bottom").cooltip({
    direction: 'right',
    align: 'bottom'
  });
  $("a#demo-direction-bottom-align-default").cooltip({
    direction: 'bottom'
  });
  $("a#demo-direction-bottom-align-right").cooltip({
    direction: 'bottom',
    align: 'right'
  });
  $("a#demo-direction-bottom-align-left").cooltip({
    direction: 'bottom',
    align: 'left'
  });
  $("a#demo-direction-left-align-default").cooltip({
    direction: 'left'
  });
  $("a#demo-direction-left-align-top").cooltip({
    direction: 'left',
    align: 'top'
  });
  $("a#demo-direction-left-align-bottom").cooltip({
    direction: 'left',
    align: 'bottom'
  });
  $('input#input-focus-demo').cooltip({
    trigger: 'focus',
    direction: 'right'
  });
  $('a#custom-class-demo').cooltip({
    "class": 'light',
    direction: 'bottom'
  });
  return $('a#error-class-demo').cooltip({
    "class": 'error',
    direction: 'left'
  });
});
