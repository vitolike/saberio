FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
ENV PORT=8000
RUN npm run build
CMD ["npm", "run", "start"]
