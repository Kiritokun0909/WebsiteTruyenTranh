const express = require('express');
const router = express.Router();

// route 
router.get('/', (req, res) => {
    res.send(
      '<h1>Hello World!</h1>'
  )
});

router.get('/test-api', (req, res) => {
    const str = [
        {
            "name": "Codr Kai",
            "msg": "This is my first tweet!",
            "username": "codrkai"
        },
        {
            "name": "Samantha Kai",
            "msg": "React JS is so simple!",
            "username": "samanthakai"
        },
        {
            "name": "John K",
            "msg": "Sweep the leg!",
            "username": "johnk"
        }
    ];
    res.end(JSON.stringify(str));
});

router.post('/addTweet', (req, res) => {
    res.end('NA');
});

module.exports = router;