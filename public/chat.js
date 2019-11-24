
//alert('hi');
//make socket connection.

//console.log(document);

$(document).ready(()=>{

var socket = io.connect('http://localhost:3000');


//Query DOM.

var message = document.getElementById('message'),
handle = document.getElementById('handle'),
//btn = document.getElementById('send'),
output = document.getElementById('output'),
feedback = document.getElementById('feedback');
output.innerHtml = '';
//console.log($("#send"));

//edmit event.

$("#send").click(()=>{

    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })

});

//console.log($("#message"));
$("#message").keypress(()=>{

    //console.log('press');
    socket.emit('KeyPress',{
        message:message.value,
        handle:handle.value
    })

});


//listen for events from server.

socket.on('chat',(data)=>{
    //console.log('data received from server : '+ data);
    var str = `<p><strong> ${data.handle} : </strong> ${data.message}</p>`;
    output.innerHTML +=  str;
    feedback.innerHTML = '';
});

socket.on('typing',(data)=>{
    //console.log('data received from server : '+ data);
    var str = `<p> ${data.handle} is typing a message ....</p>`;
    feedback.innerHTML =  str;
});


}); 

//


