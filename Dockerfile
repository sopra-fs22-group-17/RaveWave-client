FROM node:lts
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --force
CMD ["npm", "run", "start"]
