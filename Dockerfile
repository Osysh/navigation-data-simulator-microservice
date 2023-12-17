FROM node:21-alpine
WORKDIR /app
COPY . .
RUN npm install -g npm@10.2.4
RUN npm install -g rimraf
RUN npm install --omit=dev

# RUN npm start  | Ne surtout pas utiliser cette nomenclature, le build ne peut pas terminer sur un RUN
CMD ["npm", "start"]