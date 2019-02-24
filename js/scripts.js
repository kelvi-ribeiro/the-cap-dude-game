const boyPosition = {
    right:0,        
    top:0 
  } 

  const valueArrows = {
    top:38,
    right:39,
    down:40,
    left:37
  }

  var isMenuOpened = false
  
  var infoDebuggers = [];

  var speedMove = 20;
  var body = document.body,

  html = document.documentElement;

  var scrollHeight = 1000;

  const tempoCriacaoNovoPoint = 5000;

  var debuggerMode = false;
  $('#btn-handle-debugger').click(function(){
    handleDebuggers()
  });

  
  function handleDebuggers(){    
      if(debuggerMode){                  
        desligarDebuggers()
        return;
      }
      ligarDebugerers();         
  }
  function ligarDebugerers(){
    instanceIntevervalInfoImgBoyTop = setInterval(function() {  console.log('Posição Y:', $('#img-boy').offset().top - $(window).scrollTop())}, 1000); 
    infoDebuggers.push(instanceIntevervalInfoImgBoyTop)
    let instanceIntevervalInfoImgBoyLeft = setInterval(function() {  console.log('Posição X:',$('#img-boy').offset().left - $(window).scrollLeft())}, 1000); 
    infoDebuggers.push(instanceIntevervalInfoImgBoyLeft);
    debuggerMode = true;
    $('#btn-handle-debugger').text('Desligar Debuggers')
  }
  function desligarDebuggers(){
    infoDebuggers.forEach(infoDebugger => clearInterval(infoDebugger));        
    clearInterval(infoDebuggers[1])
    debuggerMode = false;
    $('#btn-handle-debugger').text('Ligar Debuggers')
    return;
  }
  function startCreatePointRed(){    
    setInterval(function(){
      $('#point-red').remove()
      $('#game-mode').append(
        `
        <div id="point-red" style="position:relative;top:${ generateRandomNumberNotOutOfRangeOfWindow()}px;left:${ Math.floor(Math.random() * (scrollHeight - 0) + 0)}px;">
        </div>
        `
      )
    },tempoCriacaoNovoPoint)
    
  }

  function generateRandomNumberNotOutOfRangeOfWindow(){
    const randomNumber = Math.floor(Math.random() * scrollHeight)      
    if(randomNumber > $(document).height() || randomNumber  > ( $(document).height() * 0.80 )){
      return generateRandomNumberNotOutOfRangeOfWindow()

    }
    return randomNumber
  }

  $( window ).resize(function() {    
    $('#img-boy').css("top",boyPosition.top = $( document ).height()  / 2)
    $('#img-boy').css("right",boyPosition.right = 0)
  });
  function enableGameMode(){
    $('#tutorial-mode').each(function() {
        $(this).remove();        
    });
    startCreatePointRed()
    
    $('#game-mode').append(
        `  <div class="has-text-centered">          
        <img id="img-boy" src="img/boy.png" alt="Boy">      
        </div>                   
        `      
        )
    $('#img-boy').css("top",boyPosition.top = $( document ).height()  / 2)
  }
  function verifyAvatarPositionIsEqualToRedDot(){
    const boyPosition = {
      left:($('#img-boy').offset().left),
      top:($('#img-boy').offset().top),
    }
    const dotPosition = {
      left:($('#point-red').offset().left),
      top:($('#point-red').offset().top),
    }
    console.log('boyPosition',boyPosition)
    console.log('dotPosition',dotPosition)
  }
  $('#start-game').click(function(){
    enableGameMode()    
  });

  $('#home').click(function(){
    location.reload();
  });

  $('.nav-toggle').click(function(){    
    if(!isMenuOpened){
      $('#menu-options').addClass( "is-active" );
      $('.nav-toggle').addClass( "is-active" );
      isMenuOpened = true      
      return
    }
    $('#menu-options').removeClass( "is-active" );
    $('.nav-toggle').removeClass( "is-active" );
    isMenuOpened = false      
  });
  

  function handleMenu(){
    if(isMenuOpened){
      isMenuOpened = false
      return
    }
    isMenuOpened = true
  }

$("body").keydown(function(e) {
  if(e.keyCode == valueArrows.left) {     
    if($('#img-boy').offset().left - speedMove < 0){
      $('#img-boy').css("right",boyPosition.right  -= $( document ).width())
      return
    } 
    $('#img-boy').css("right",boyPosition.right += speedMove)
  }
  else if(e.keyCode == valueArrows.right) {
    if(($('#img-boy').offset().left + speedMove * 4) > $( document ).width()){
      $('#img-boy').css("right",boyPosition.right -= (( speedMove * 4 ) - $( document ).width()))  
      return
    } 
    $('#img-boy').css("right",boyPosition.right -= speedMove)
  }else if(e.keyCode == valueArrows.down){    
    if(($('#img-boy').offset().top + speedMove * 5) > $( document ).height()){
      $('#img-boy').css("top",boyPosition.top = 0)
    }
    $('#img-boy').css("top",boyPosition.top += speedMove)
  }else if(e.keyCode ==  valueArrows.top){                
    if(($('#img-boy').offset().top - $(window).scrollTop() - (speedMove + $('.nav-background').height())) < 0) {
      $('#img-boy').css("top",boyPosition.top = $( document ).height())
    }
    
    $('#img-boy').css("top",boyPosition.top -= speedMove)
  }
  //verifyAvatarPositionIsEqualToRedDot()
});