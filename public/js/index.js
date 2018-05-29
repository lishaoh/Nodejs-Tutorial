var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: "Andrew",
    text: "中国共产党万岁"
  });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});


socket.on('newMessage', (message) => {
  console.log('newMessage', message);
})
