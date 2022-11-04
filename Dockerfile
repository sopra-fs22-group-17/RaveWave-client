FROM node:16.14.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --force \
  npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
