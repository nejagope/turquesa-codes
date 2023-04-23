var working = false;
function login(){
    console.log('login')
   
    if (working) return;
    working = true;
    var $this = $(".login"),
    $state = $this.find('button > .state');
    var username = $("#username").val();
    var password = $("#password").val();
    
    $this.addClass('loading');
    $state.html('Authenticating');

    $.get(`https://turquesa.azurewebsites.net/api/CodesGenerator?user=TU1-${username}&password=${password}&registros=1`, function(data, status){
      console.log("Data: " + JSON.stringify(data));
      try{
        if (data.isSuccess){
          $this.addClass('ok');
          $(".state").css("fontSize", "xx-large");
          $state.html(`Su c&oacute;digo es: ${data.content}`);
        }else{
          $this.addClass('bad');
          $(".state").addClass("font-xxlarge");
          $(".spinner").hide();          
          $state.html(`${data.message}`);
          setTimeout(function() {
            $state.html('Log in');
            $this.removeClass('bad ok loading'); 
            $(".state").removeClass('font-xxlarge');          
            $(".spinner").show();            
            working = false;
          }, 2000);
        }
      }catch(ex){

      }
    });
    /*
    setTimeout(function() {
      $this.addClass('ok');
      $state.html('Welcome back!');
      setTimeout(function() {
        $state.html('Log in');
        $this.removeClass('ok loading');
        working = false;
      }, 4000);
    }, 3000);  
    */
}