#Build
FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

#Production 
FROM node:18-alpine AS production 

WORKDIR /app 

COPY --from=build /app/package*.json ./  

RUN npm install --omit=dev 

COPY --from=build /app/src ./src   

EXPOSE 6969 

CMD ["npm" , "run", "serve"]