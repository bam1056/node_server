
const http = require('http');

const PORT=3000;

function handleRequest(request, response){
    http.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f58e6b9d8cfa1227c5f00c181491d8e4",  function(res) {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        let data = JSON.parse(chunk)
        response.end('It Works!! Path Hit' + data.main.temp);
      });
    })

}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
