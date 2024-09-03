const http = require('http');
const { getNews, handleNotFound } = require('./controllers/getNews');

const PORT = 3000;

const requestHandler = (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/getTimeStories') {
    getNews(req, res);
  }
  else{
    handleNotFound(req,res);
  }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});