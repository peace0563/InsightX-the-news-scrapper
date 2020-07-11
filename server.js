const http = require('http');
const fs = require('fs');
const con = require("./dbconn");

const hostname = '127.0.0.1';
const port = '3000';

const server = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./index.html').pipe(res);

    }
    else if(req.method == 'GET' && req.url == '/css/style.css')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream('./css/style.css').pipe(res);
    }
    else if(req.method == 'GET' && req.url == '/function.js')
    {
        res.writeHead(200, {"Content-Type":"text/javascript"});
        fs.createReadStream('./function.js').pipe(res);
    }
    else if(req.method == 'GET' && req.url == '/home')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        var conn = con.getConnection();

        conn.query('SELECT * from news order by news_id DESC', function(error, results, fields){
            if(error) throw error;

            var news = JSON.stringify(results)

            res.end(news);
        });

        conn.end();
    }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});