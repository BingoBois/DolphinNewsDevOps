FROM node:8.12.0-jessie
WORKDIR /root
RUN git clone https://github.com/BingoBois/DolphinNewsNode.git
WORKDIR /root/DolphinNewsNode
RUN npm i -g typescript
RUN npm install
RUN tsc
CMD ["npm" "start"]
