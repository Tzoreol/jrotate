$(document).ready(function() {
  $('input[type=button]').click(function() {
    $('#rotate').rotate(45,1000);  
  });
  
  $('input[type=submit]').click(function() {
    var html = $('#code texarea').val();
    
    $('#result').html(html);
  });
});
