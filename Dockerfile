FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install && bun run build

EXPOSE 3000

CMD ["bun", "start"]