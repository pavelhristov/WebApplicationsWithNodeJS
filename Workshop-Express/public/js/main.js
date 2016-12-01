  /* globals $ */

  var socket = io.connect('http://localhost:3001');
  // socket.on('news', function(data) {
  //     console.log(data);
  //     socket.emit('my other event', { my: 'data' });
  // });

  let $notification = $("#notification");
  socket.on('newSuperhero', function(data) {
      $notification.html("");
      $notification.append(`<a href="/superheroes/${data.superheroId}">${data.message}</a>`);
      $notification.append(`<p>Created by ${data.creator}</p>`);

  });


  $(document).ready(function() {
      $('#superhero-create-form').on('submit', function(ev) {

          ev.preventDefault();

          $.ajax({
              url: '/superheroes/create',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({
                  name: $('#name').val(),
                  secretIdentity: $('#secretIdentity').val(),
                  city: $("#city").val(),
                  alignment: $("#alignment").val(),
                  story: $("#story").val(),
                  image: $("#image").val(),
                  powers: $("#powers").val(),
                  fractions: $("#fractions").val()
              }),
              cache: false,
              timeout: 10000,
              success: function() {
                  document.location.href = "/superheroes";
              }
          });

          socket.on("superheroAlreadyExists", function(data) {
              $notification.html("");
              $notification.append(`<a href="/superheroes/${data.superheroId}">${data.message}</a>`);
          });
          return false;
      });
  });