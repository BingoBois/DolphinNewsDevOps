const axios = require('axios');

var send = require('gmail-send')({
  //var send = require('../index.js')({
    user: 'polygonmail4@gmail.com',
    // user: credentials.user,                  // Your GMail account used to send emails
    pass: 'polygon1234',
    // pass: credentials.pass,                  // Application-specific password
    to:   'william.pfaffe@gmail.com, viktorkim2005@hotmail.com, ceo_titanic@msn.com, exomemphiz@gmail.com, cph-zr16@cphbusiness.dk',
    subject: 'Dolphinnews: 50+ Backend fejl i timen, paa Dolphinnews backenden!',
    text:    'Saa er den gal igen! Over 50 fejl, git gud boys!!!',         // Plain text
});

function sendMail(){
  send({
    text:    'Saa er den gal igen! Over 50 fejl, git gud boys!!!'
  }, function (err, res) {
    if(err){
      console.log(err);
    }else{
      console.log('Sent warning mail!');
    }
  });
}

const postParams = {
  query: {
    range: {
      Time: {
        gte: "now-1h",
        lt: "now"
      }
    }
  }
}

function postCall(){
  axios.post('http://dbdolphin.viter.dk:9200/dolphin-backend-error/error/_search?pretty', postParams)
  .then(function (response) {
    let errorsLastPeriod = response.data.hits.total; //Last hour
    if (errorsLastPeriod > 50){
      sendMail();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Checks every 30 seconds if there are above X errors
setInterval(postCall, 30000);
