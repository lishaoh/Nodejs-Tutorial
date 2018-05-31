var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm:ss a');

  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm:ss a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);

  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
})

var locationBtn = jQuery('#send-location');
locationBtn.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationBtn.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location!');
  })
});
