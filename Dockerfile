FROM node:14.21.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i react-scripts \
    && npm install --production \
    && npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
