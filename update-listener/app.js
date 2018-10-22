const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'sutmig' });
const updater = require('./updatecluster'); 

let buildEvents = [`Waiting for work Time: ${new Date()}`];

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    let prettyMessage = `Building status: ${buildEvents[buildEvents.length-1]}\n\n\n`;
    buildEvents.forEach((e) => {
      prettyMessage += `${e}\n\n`;
    });
    res.end(prettyMessage)
  })
}).listen(7777)
 
handler.on('error', function (err) {
  buildEvents.push(`Error: ${err.message} Time: ${new Date()}`);
})
 
handler.on('push', async function (event) {
  let repoName = event.payload.repository.name;
  if(event.payload.ref === "refs/heads/master"){
    buildEvents.push(`Started building ${repoName} Time: ${new Date()}`);
    await updater.updateCluster(event.payload.repository.name);
    buildEvents.push(`Built ${repoName} done! Time: ${new Date()}`);
    buildEvents.push(`Waiting for work Time: ${new Date()}`);
  }
});
