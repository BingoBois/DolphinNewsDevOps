# Devops stuff for Dolphinnews  
  
https://hub.docker.com/u/dolphinnews/  
  
nginx conf goes into /etc/nginx/etc.d/  
  
Kubernetes:  
--pod-network-cidr=10.244.0.0/16  
  
Commands:  

kubectl get (nodes/pods/deployments/services)  
kubectl delete (node/pod/deployment/service) name  
kubectl scale deployments/nameofdeployment --replicas=85  
kubectl describe services/nameofservice  

kubectl create -f file.yaml  

// Sort by label (-l) | show labels = --show-labels  
kubectl get pod -l app=sa-frontend  

// Service  
kubectl create -f service-dolphin-frontend-lb.yaml  
  
Deploy and apply update:  
kubectl apply -f sa-frontend-deployment.yaml  
kubectl apply -f deploy-frontend-green-pods.yaml --record  
  
Undo:  
kubectl rollout history deployment sa-frontend  
kubectl rollout undo deployment sa-frontend --to-revision=1  
  
  
MetalLB:  
base: 10.244.x.x  
node1: 10.244.1.0/24  
pod1: 10.244.1.8 | pod2: 10.244.1.9  
addresses: 10.244.1.0-192.168.1.255  
