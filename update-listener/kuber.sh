#!/bin/sh
if [ $1 = "DolphinNewsFrontend" ]; then
  echo "Updating frontend pods!" >> shresult
  docker build --no-cache -t $2 /root/devops/resource-manifests/images/frontend
  docker push $2
  kubectl apply -f /root/devops/resource-manifests/deployments/dolphin-frontend-deployment.yaml --record
  touch donewithfrontend
else
  echo "new pods on backend!" >> shresult
fi
