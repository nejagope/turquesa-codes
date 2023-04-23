var working = false;
function login(){
    if (working) return;
    working = true;
    var $this = $(".login"),
    $state = $this.find('button > .state');
    var username = $("#username").val();
    var password = $("#password").val();

    if (!username || !password){
      working = false;
      return;
    }else{
      const myRe = /^\d{1,2}([a-z]|([A-Z]))$/g;
      var pruebaDirección = myRe.test(username);
      console.log(pruebaDirección);
      if (!pruebaDirección){
        console.log('no pasó la prueba')
        $this.addClass('bad');          
          $(".spinner").hide();          
          $state.html('Debe ingresar el número de casa seguido de la manzana sin espacios. (Por ejemplo: 5A, 16H, 7E)');
          setTimeout(function() {
            $state.html('Log in');
            $this.removeClass('bad ok loading');                  
            $(".spinner").show();            
            working = false;            
          }, 4000);
          return;
      }  
    }
    
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