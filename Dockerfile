FROM rust:1.40 AS builder
RUN cargo install scicalc-rs

FROM node:buster-slim AS production
# RUN apt-get update && apt-get install -y extra-runtime-dependencies && rm -rf /var/lib/apt/lists/*
COPY . .
COPY --from=builder /usr/local/cargo/bin/scicalc-rs /usr/local/bin/scicalc-rs
# CMD ["myapp"]