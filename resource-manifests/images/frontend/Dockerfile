# 1 - Build
FROM node:8.12.0-jessie as build-deps
WORKDIR /root
RUN git clone https://github.com/BingoBois/DolphinNewsFrontend.git
WORKDIR /root/DolphinNewsFrontend
COPY node_modules ./node_modules/
RUN npm i -g typescript
RUN tsc
RUN npm run build

# 2 - Prod Nginx
FROM nginx:1.15.5
COPY --from=build-deps /root/DolphinNewsFrontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
