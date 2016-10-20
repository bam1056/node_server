const http = require('http');

const PORT=3000;

function handleRequest(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end("THERE WAS AN ERROR");
  });

  http.get("http://api.openweathermap.org/data/2.5/group?id=4171563,4174757,4173558,4148757&appid=f58e6b9d8cfa1227c5f00c181491d8e4",  function(res) {
    res.setEncoding('utf8');
    res.on('error', function(error){
      response.end("THERE WAS AN ERROR");
    });

    res.on('data', (chunk) => {
      let data = JSON.parse(chunk);
      const styles='"display: flex; flex-direction: column; text-align: center; background-color:#61CEED; height:100%"'

      let temps = data.list ? data.list.map(city => {
        const F = Math.floor(1.8*(city.main.temp - 273) + 32);
        return (` <p><strong>${city.name} Average Temp:</strong> ${F}&deg; F\n\n</p>`)
      }) : ['We apologize, but it seems there was an error with the server request. Please try again later.'];

      response.end(`<div style=${styles}><h1>Welcome to the Weather Server!</h1>${temps.join('')}</div>`);
    });
  });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
