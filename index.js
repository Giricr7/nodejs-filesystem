const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path')


//creating the timestamp files
createTimestamp = () => {
     let date = new Date().toLocaleDateString('en-CA');
     let time = new Date().toLocaleTimeString().split(':').join('.');
     let currentTimestamp = JSON.stringify(new Date());
     currentTimestamp = currentTimestamp.split('T').join(' ')
     fs.writeFileSync(path.join('C:/timestamp', `${date} - ${time} .txt`), currentTimestamp);
    
     return ('file saved successfully');
}

loadAPP = () => {
    try {

      //creating the text files
      app.post('/write', (req, res) => {
        if (!fs.existsSync('C:/timestamp')) {
            fs.mkdirSync('C:/timestamp',{ recursive: true });
            res.send(createTimestamp())
          
        } else {
          res.send(createTimestamp())
          }
 
      })
      
      // retrieving the timestamp files
      app.get('/read', (req, res) => {
        let files = [];
        fs.readdirSync('C:/timestamp').forEach(file => {
          files.push(file)
        });
        res.send(files);
      })

      //starting the server
    app.listen(PORT, (req, res) => {
       res(console.log('server started successfully'));
    })
  } catch (err) {
      console.error(err);
  }
}



loadAPP();