#!/bin/sh
if [ $1 = "DolphinNewsFrontend" ]; then
  echo $2
  docker build --no-cache -t $2 /home/dolphin/DolphinNewsDevOps/resource-manifests/images/frontend
  docker push $2
  kubectl apply -f /home/dolphin/DolphinNewsDevOps/resource-manifests/deployments/dolphin-frontend-deployment.yaml --record
else
  docker build --no-cache -t $2 /home/dolphin/DolphinNewsDevOps/resource-manifests/images/backend
  docker push $2
  kubectl apply -f /home/dolphin/DolphinNewsDevOps/resource-manifests/deployments/dolphin-backend-deployment.yaml --record
fi
