const crypto = require('crypto');
const fs = require('fs');
let spawn = require('child_process').spawn;

function updateCluster(podType, scriptPath=`/root/devops/update-listener/kuber.sh`) {
    return new Promise((resolve, reject) => {
      let hash = getHash();
      if(podType === 'DolphinNewsFrontend'){
        let filePath = '/root/devops/resource-manifests/deployments/dolphin-frontend-deployment.yaml';
	let regex = /(- image: )([\S]*)/;
	regexReplace(filePath, regex, `dolphinnews/frontend:${hash}`);
      }
      let child = spawn('bash', [scriptPath, podType, `dolphinnews/frontend:${hash}`]);
  
      child.stderr.on('data', (data) => {
        reject('Error: ' + data);
      });
  
      child.on('exit', function () {
        resolve('exit');
      });
    });
}

function getHash(){
  let hash = crypto.createHash('md5').update(new Date().toGMTString()).digest('hex');
  return hash.substring(0,6);
}


function regexReplace(path, regex, replacement){
  let fileContent = fs.readFileSync(path, 'utf8');

  fileContent = fileContent.replace(regex, `$1${replacement}`);
  fs.writeFileSync(path, fileContent);
}


module.exports = {
    updateCluster
}
