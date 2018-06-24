var socket=io();
var uname=undefined;

function scroll(){
  var messages=jQuery('#messages');

  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  if(scrollTop+clientHeight<=scrollHeight)
    messages.scrollTop(scrollHeight);
}

socket.on('connect',function(){
  console.log('Connected');
});


socket.on('newMessage',function(message){
  console.log('New Message',message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  if(message.from===uname)
    $(li).addClass("user");
  else
    $(li).addClass("friend");
  jQuery('#messages').append(li);
  scroll();
});

jQuery("#message-form").on("submit",function(e){
e.preventDefault();
if($(".name").val()!="" && jQuery('[name=message]').val()!="" ){
  socket.emit('createMessage',{
    from:$(".name").val(),
    text: jQuery('[name=message]').val()
  },function(){

  });
  jQuery(".usersmessage").val("");
  uname=$(".name").val();
  $('.name').prop("disabled", true);
  console.log($(uname));
}
});

socket.on('disconnect',function(){
  console.log('Disconnected');
});
