import elasticsearch from 'elasticsearch';

let client = new elasticsearch.Client({  
  hosts: [
    'http://dbdolphin.viter.dk:9200/'
  ]
});

function logMessage(message){
  client.index({ 
    index: 'dolphin-devops-message',
    type: 'statusmessage',
    body: {
      "Message": message,
      "Time": new Date().toString()
    }
  }, (err, resp) => {
    console.log(resp);
    if(err){
      console.log(err);
    }
  });
}

module.exports = {
  logMessage
};
