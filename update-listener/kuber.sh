#!/bin/sh
if [ $1 = "DolphinNewsFrontend" ]; then
  docker build --no-cache -t $2 /root/devops/resource-manifests/images/frontend
  docker push $2
  kubectl apply -f /root/devops/resource-manifests/deployments/dolphin-frontend-deployment.yaml --record
else
  docker build --no-cache -t $2 /root/devops/resource-manifests/images/backend
  docker push $2
  kubectl apply -f /root/devops/resource-manifests/deployments/dolphin-backend-deployment.yaml --record
fi
