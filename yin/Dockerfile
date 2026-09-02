FROM node:20-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 praat ffmpeg libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV MONGO_URL=mongodb://host.docker.internal:27017/yin
ENV PYTHON_EXECUTABLE=python3

EXPOSE 3000

CMD ["npm", "run", "start"]
