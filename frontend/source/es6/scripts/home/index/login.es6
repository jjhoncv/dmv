$("form").on("submit", function(e){
  e.preventDefault();
  $.post('/login/authenticatess', $("form").serialize(), function(data){
    //console.log(data);
  },'json');
});