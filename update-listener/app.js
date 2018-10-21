const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'sutmig' });
const updater = require('./updatecluster'); 

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)
 
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('push', async function (event) {
  if(event.payload.ref === "refs/heads/master"){
    console.log('Running kub.sh');
    await updater.updateCluster(event.payload.repository.name);
    console.log('Done with kub.sh');
  }
});
