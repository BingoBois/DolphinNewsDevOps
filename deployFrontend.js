const fs = require('fs');
let spawn = require('child_process').spawn;

let imageTag = process.argv[2];
if (imageTag === undefined || imageTag.length != 6 ){
  console.log('\nGo on your local machine and build the resource-manifests/images/frontend/Dockerfile with a random 6 character end tag');
  console.log('sudo docker build -t dolphinnews/frontend:8501c4 .');
  console.log('docker push dolphinnews/frontend:8501c4');
  console.log('Run this script, and give it the end tag as argument, like this:');
  console.log('node deployFrontend.js 8501c4\n');
}
else{
  updateFrontend(imageTag);
}


function updateFrontend(imageTag) {
  return new Promise((resolve, reject) => {

    let filePath = '/root/devops/resource-manifests/deployments/dolphin-frontend-deployment.yaml';
    let regex = /(- image: )([\S]*)/;
    regexReplace(filePath, regex, `dolphinnews/frontend:${imageTag}`);
    let child = spawn('bash', ['-c', `kubectl apply -f ${filePath} --record`]);

    child.stderr.on('data', (data) => {
      reject('Error: ' + data);
    });

    child.on('exit', function () {
      resolve('exit');
    });
  });
}

function regexReplace(path, regex, replacement){
  let fileContent = fs.readFileSync(path, 'utf8');

  fileContent = fileContent.replace(regex, `$1${replacement}`);
  fs.writeFileSync(path, fileContent);
}
