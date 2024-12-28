const express = require("express");
const CORS = require("cors");
const fs = require("fs");
const https = require("node:https");
// const multer = require('multer')


const app = express();
const port = 5000;

app.use(CORS());
app.use(express.json()); // Middleware для обработки JSON
app.use('/images' , express.static(__dirname + '/img'));
// const upload = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = __dirname + '/img';
//     cb(null, dir);
//   }
// })

/*
GET: returns URLs to all images.
 */
app.get('/api/images', (req, res) => {
  fs.readdir('./img', (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Ошибка чтения директории');
    }
    const filePaths = files.map(file => `${req.protocol}://${req.get('host')}/images/${file}`); // получаем ссылки к картинам
    res.json(filePaths); // Отправляем массив путей к файлам в формате JSON
  });
});

// POST: Adds a new img
app.post('/api/images/add', (req, res) => {
  console.log('Новый запрос на загрузку изображений');

  const { title, fileURL } = req.body;
  console.log(fileURL);
  const file = fs.createWriteStream('img/' + title);
  https.get(fileURL, function(responseFile) {
    if (responseFile.statusCode !== 200) {
      res.send("Error loading file: broken link")
      return;
    }
    responseFile.pipe(file).on('error', (err) => console.log(err));
    file.on("finish", () => {
      file.close();
      res.status(200).send('Данные успешно получены');
    });
  })

});

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
});
