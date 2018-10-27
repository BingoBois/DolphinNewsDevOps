const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'sutmig' });
const updater = require('./updatecluster'); 

let buildEvents = [`Waiting for work | TIME: ${new Date(new Date().getTime() + 7200000)}`];

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    let prettyMessage = `Building events: \n\n\n`;
    buildEvents.reverse().forEach((e) => {
      prettyMessage += `${e}\n\n`;
    });
    res.end(prettyMessage)
  })
}).listen(7777)
 
handler.on('error', function (err) {
  buildEvents.push(`Error: ${err.message} | TIME: ${new Date(new Date().getTime() + 7200000)}`);
})
 
handler.on('push', async function (event) {
  let repoName = event.payload.repository.name;
  if(event.payload.ref === "refs/heads/master"){
    buildEvents.push(`Started building ${repoName} | TIME: ${new Date(new Date().getTime() + 7200000)}`);
    await updater.updateCluster(event.payload.repository.name);
    buildEvents.push(`Built ${repoName} done! | TIME: ${new Date(new Date().getTime() + 7200000)}`);
    buildEvents.push(`Waiting for work | TIME: ${new Date(new Date().getTime() + 7200000)}`);
  }
});
