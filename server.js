let express = require('express');
let fs = require('fs');
let app = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.post('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsed = JSON.parse(data);
  parsed.push(req.body);
  fs.writeFileSync('./storage.json', JSON.stringify(parsed));
  res.send('user created')
});

app.get('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsed = JSON.parse(data);
  res.json(parsed);
});

app.get('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsed = JSON.parse(data);
  let User = parsed.filter((item) => {
    return item.name === req.params.name;
  })
  res.json(User[0])
})

app.patch('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsed = JSON.parse(data);
  let update = parsed.map((item) => {
    if (item.name === req.params.name) {
      return req.body;
    } else {
      return item;
    }
  })
  fs.writeFileSync('./storage.json', JSON.stringify(update));
  res.send('updated')
})


app.delete('/delete/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsed = JSON.parse(data);
  let filtered = parsed.filter((item) => {
    return item.name !== req.params.name;
  });
  fs.writeFileSync('./storage.json', JSON.stringify(filtered));
  res.send('deleted')
})


app.listen(port, function() {
  console.log("listening on port: ", port);
})
