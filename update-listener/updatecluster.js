const crypto = require('crypto');
const fs = require('fs');
let spawn = require('child_process').spawn;

const FRONTEND_YAML_PATH = '/home/dolphin/DolphinNewsDevOps/resource-manifests/deployments/dolphin-frontend-deployment.yaml';
const BACKEND_YAML_PATH = '/home/dolphin/DolphinNewsDevOps/resource-manifests/deployments/dolphin-backend-deployment.yaml';

function updateCluster(podType, scriptPath = `/home/dolphin/DolphinNewsDevOps/update-listener/kuber.sh`) {
  return new Promise((resolve, reject) => {
    let hash = getHash();
    const filePath = (podType === 'DolphinNewsFrontend') ? FRONTEND_YAML_PATH : BACKEND_YAML_PATH;
    const regex = /(- image: )([\S]*)/;
    regexReplace(filePath, regex, `dolphinnews/${filePath === FRONTEND_YAML_PATH ? 'frontend' : 'backend'}:${hash}`);
    let child = spawn('bash', [scriptPath, podType, `dolphinnews/${filePath === FRONTEND_YAML_PATH ? 'frontend' : 'backend'}:${hash}`]);
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
