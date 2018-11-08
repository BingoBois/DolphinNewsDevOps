const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'sutmig' });
const updater = require('./updatecluster'); 

let buildEvents = [`Waiting for work | TIME: ${new Date(new Date().getTime())}`];

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    let prettyMessage = `Building events: \n\n\n`;
    buildEvents.reverse().forEach((e) => {
      prettyMessage += `${e}\n\n`;
    });
    buildEvents.reverse();
    res.end(prettyMessage);
  })
}).listen(7777)
 
handler.on('error', function (err) {
  buildEvents.push(`Error: ${err.message} | TIME: ${new Date(new Date().getTime())}`);
})
 
handler.on('push', async function (event) {
  let repoName = event.payload.repository.name;
  if(event.payload.ref === "refs/heads/master"){
    buildEvents.push(`Started building ${repoName} | TIME: ${new Date(new Date().getTime())}`);
    await updater.updateCluster(event.payload.repository.name);
    buildEvents.push(`Built ${repoName} done! | TIME: ${new Date(new Date().getTime())}`);
    buildEvents.push(`Waiting for work | TIME: ${new Date(new Date().getTime())}`);
  }
});
