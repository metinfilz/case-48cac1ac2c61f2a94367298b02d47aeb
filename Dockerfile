FROM node:18-bookworm-slim as base
WORKDIR /usr/src/app
COPY package.json ./

FROM base as development1
RUN npm install

FROM development1 as development2
COPY . .
RUN npm run build


FROM base as production
COPY package.json ./
COPY --from=development2 /usr/src/app/dist /usr/src/app
RUN npm install --omit=dev
EXPOSE 3000
CMD [ "node", "index.js" ]
