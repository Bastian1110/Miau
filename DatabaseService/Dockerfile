#Build
FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

#Production 
FROM node:18-alpine AS production 

WORKDIR /app 

COPY --from=build /app/package*.json ./  

ADD .secret /app/.secret/

RUN npm install --omit=dev 

COPY --from=build /app/dist ./dist     

EXPOSE 6969

CMD ["npm" , "run", "serve"]