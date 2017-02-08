$("form").on("submit", function(e){
  e.preventDefault();
  $.post('/login/authenticate', $("form").serialize(), function(data){
    //console.log(data);
  },'json');
});