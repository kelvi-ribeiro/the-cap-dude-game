const boyPosition = {
    right:0,        
    top:0        
  } 
  
  var infoDebuggers = [];
  
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
    instanceIntevervalInfoImgBoyTop = setInterval(function() {  console.log($('#img-boy').offset().top - $(window).scrollTop())}, 1000); 
    infoDebuggers.push(instanceIntevervalInfoImgBoyTop)
    let instanceIntevervalInfoWindowHeight = setInterval(function() {  console.log($(window).height())}, 1000); 
    infoDebuggers.push(instanceIntevervalInfoWindowHeight);
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
  function enableGameMode(){
    $('#tutorial-mode').each(function() {
        $(this).remove();        
    });
    $('#game-mode').append(
        `  <div class="has-text-centered">          
          <img id="img-boy" src="img/boy.png" alt="Boy">      
        </div>            
        `
    )
  }
  $('#start-game').click(function(){
    enableGameMode()    
  });

  $('#home').click(function(){
    location.reload();
  });

  $('#arrow-left').click(function(){      
    $('#img-boy').css("right",boyPosition.right += 5)
  });
  $('#arrow-right').click(function(){
    $('#img-boy').css("right",boyPosition.right -= 5)
  });
  $('#arrow-top').click(function(){
    $('#img-boy').css("top",boyPosition.top += 5)
  });
  $('#arrow-top').click(function(){
    $('#img-boy').css("top",boyPosition.top -= 5)
  });
  

$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left        
    $('#img-boy').css("right",boyPosition.right += 5)
  }
  else if(e.keyCode == 39) { // right
    $('#img-boy').css("right",boyPosition.right -= 5)
  }else if(e.keyCode == 40){
      if(($('#img-boy').offset().top - $(window).scrollTop() + 5) < 0) return;
      if(($('#img-boy').offset().top - $(window).scrollTop() + 5) > $(window).height()) return;
    $('#img-boy').css("top",boyPosition.top += 5)
  }else if(e.keyCode == 38){            
    if(($('#img-boy').offset().top - $(window).scrollTop() - 5) < 0) return;
    $('#img-boy').css("top",boyPosition.top -= 5)
  }
});