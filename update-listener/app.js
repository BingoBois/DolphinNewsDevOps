const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'sutmig' });
const updater = require('./updatecluster');
let { logMessage } = require('./elasticsearch');

let buildEvents = [`Waiting for work | TIME: ${new Date(new Date().getTime())}`];

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    let prettyMessage = `Building events: \n\n\n\n`;
    buildEvents.reverse().forEach((e) => {
      prettyMessage += `${e}\n\n`;
    });
    buildEvents.reverse();
    res.end(prettyMessage);
  })
}).listen(7777)
 
handler.on('error', function (err) {
  let msg = `Error: ${err.message} | TIME: ${new Date(new Date().getTime())}`;
  logMessage(msg);
  buildEvents.push(msg);
})
 
handler.on('push', async function (event) {
  let repoName = event.payload.repository.name;
  if(event.payload.ref === "refs/heads/master"){
    let msg1 = `Started building ${repoName} | TIME: ${new Date(new Date().getTime())}`;
    logMessage(msg1);
    buildEvents.push(msg1);

    await updater.updateCluster(event.payload.repository.name);

    let msg2 = `Built ${repoName} done! | TIME: ${new Date(new Date().getTime())}`;
    logMessage(msg2);
    buildEvents.push(msg2);

    let msg3 = `Waiting for work | TIME: ${new Date(new Date().getTime())}`;
    logMessage(msg3);
    buildEvents.push(msg3);
  }
});
