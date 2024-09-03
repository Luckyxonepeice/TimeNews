const fs = require('fs');

exports.getNews = async (req, res) => {

  fetch("https://time.com/").then(async (response) => {

    const result = await response.text();

    const splitHtml = result.split('<li class="latest-stories__item">');

    splitHtml.shift();
    // splitHtml.pop();

    const anchorRegex = /<a href="([^"]*)"/;
    const headingRegex = /<h3 class=["']latest-stories__item-headline["']>(.*?)<\/h3>/;

    let latestNews = [];

    splitHtml.forEach(element => {
      
      const link = element.match(anchorRegex);
      const heading = element.match(headingRegex);

      // console.log(`https:/${link[1]}`);
      // console.log(heading[1]);

      latestNews.push({
        title:heading[1],
        link:`https://time.com/${link[1]}`
      })
      
    });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(latestNews));
    
  });
}

exports.handleNotFound = (req,res)=>{

  res.writeHead(404, {'Content-Type':'text/plain'});
  res.end("No Url Found !");
}