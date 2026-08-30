FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev --include=optional --force && npm install @rolldown/binding-linux-x64-gnu --save-optional
COPY . .
EXPOSE 8000
RUN npm run build
CMD ["npx", "vinext", "start", "--hostname", "0.0.0.0", "--port", "8000"]
