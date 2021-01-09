FROM rust:1.40 AS builder
RUN cargo install scicalc-rs

FROM node:10.23.1-buster-slim AS production
COPY . .
# EXPOSE 8000 used for local testing
RUN npm install
COPY --from=builder /usr/local/cargo/bin/scicalc-rs /usr/local/bin/scicalc-rs
CMD ["npm", "start"]