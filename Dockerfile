# get all dependencies
FROM node:18-alpine as dependencies
WORKDIR /personal-site-24
COPY package.json package-lock.json ./
RUN npm install

# build the next js folder
FROM node:18-alpine as builder

ARG COMMON_MD_DIR
ARG MD_ASSET_DIR

ENV COMMON_MD_DIR=$COMMON_MD_DIR
ENV MD_ASSET_DIR=$MD_ASSET_DIR
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /personal-site-24
COPY . .
COPY --from=dependencies /personal-site-24/node_modules ./node_modules
RUN npm run build
RUN npm run test

# run the next js app
FROM node:18-alpine as runner
WORKDIR /personal-site-24

COPY --from=builder /personal-site-24/next.config.js ./
COPY --from=builder /personal-site-24/public ./public
COPY --from=builder /personal-site-24/.next ./.next
COPY --from=builder /personal-site-24/node_modules ./node_modules
COPY --from=builder /personal-site-24/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]