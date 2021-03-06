const http = require('http');

// port for server to listen on
const PORT=3000;

// function to handle the request to the server
function handleRequest(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end("THERE WAS AN ERROR");
  });

  // server side request to the Open Weather API
  http.get("http://api.openweathermap.org/data/2.5/group?id=4171563,4174757,4173558,4148757&appid=f58e6b9d8cfa1227c5f00c181491d8e4",  function(res) {
    res.setEncoding('utf8');
    res.on('error', function(error){
      response.end("THERE WAS AN ERROR");
    });

    res.on('data', (chunk) => {

      // parse data from OpenWeather API into manageable format
      let data = JSON.parse(chunk);

      // style variable for the response body
      const styles='"display: flex; flex-direction: column; text-align: center; background-color:#61CEED; height:100%;"'

      // calculuate average temp from the local cities
      let avgTemp = data.list.map(city => city.main.temp).reduce((prev, curr) => prev + curr) / 4;

      // convert Kelvin to Celsius
      let fahrAvgTemp = Math.floor(1.8*(avgTemp - 273) + 32);

      // variable to hold array of html strings containing city names and temps
      let temps = data.list ? data.list.map(city => {
        const F = Math.floor(1.8*(city.main.temp - 273) + 32);
        return (` <p><strong>${city.name} Current Temp:</strong> ${F}&deg; F\n\n</p>`)
      }) : ['We apologize, but it seems there was an error with the server request. Please try again later.'];

      // response object sent to the browser
      response.end(`<div style=${styles}><h1>Welcome to the Weather Server!</h1>${temps.join('')}<h3 style="border: 1px solid black;">Average Temp in Area: ${fahrAvgTemp}&deg;F</h3></div>`);
    });
  });
}

// create server
var server = http.createServer(handleRequest);

// tell server to listen on port 3000
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
