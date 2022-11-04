FROM node:16.14.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --force
RUN npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
