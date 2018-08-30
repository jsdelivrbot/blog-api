const express   = require('express')
const app       = express()
const path      = require('path');
//const mysql     = require('mysql');
const port      = 3000;

const postsObject = require('./mock-posts.json')

app.use(function(req, res, next){
  if (path.extname(req.path) === '.js'){
    res.set("content-type", "application/javascript; charset=utf-8");
  }
  res.setHeader('Access-Control-Allow-Origin', 'https://trendandtonic-3d8e1.firebaseapp.com');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/post/:id', function (req, res) {
  return res.json({"data":{"type": "post", "id":"12312342", "date":"asdf", "post-id":1, "title":"asdf", "condensedtitle":"gsdhe", "content":"adsfag", "coverphoto":"aheteh" }});
});

// for database
// app.get('/posts', function (req, res) {
//    const query = 'SELECT * FROM posts';
//    queryDatabase(query ,function(err,data){
//     console.log(data);
//     return res.json(data);
//   });
// });

app.get('/posts', function (req, res) {
  return res.json(postsObject);
});


app.listen(port);


function queryDatabase(sqlquery, callback) {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: 'blog'
    });

    connection.connect((err) => {
      console.log("connected");
      if (err) {
        return reject(err);
      }
    });

    connection.query(sqlquery, function (err, results) {
      if (err) {
        return reject(err);
      };

      //console.log(results[0]);
      var jsonResult = {"data": []};
      results.forEach(function(post) {
        jsonResult.data.push({
          "type": "post",
          "id": post.id,
          "attributes": {
            "date": post.date,
            "condensedtitle": post.condensedtitle,
            "title": post.title,
            "content": post.content,
            "coverphoto": post.coverphoto
          }
        });
      });
      var result =  { 
              "data" : {
                "type": "post",
                "id": results[0].id,
                "attributes": {
                  "date": results[0].date,
                  "condensedtitle": results[0].condensedtitle,
                  "title": results[0].title,
                  "content": results[0].content,
                  "coverphoto": results[0].coverphoto
                }
              }
            };

      

      callback(null, jsonResult);
    });

    connection.end();
}


exports = module.exports = app;