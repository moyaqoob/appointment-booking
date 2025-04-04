FROM oven/bun:alpine

WORKDIR /

COPY package.json bun.lock ./

RUN bun install

COPY . .

EXPOSE 1000

CMD ["bun","index.ts"]
