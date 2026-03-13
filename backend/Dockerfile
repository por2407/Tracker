# Dockerfile.dev
FROM golang:alpine

WORKDIR /app

# Copy mod และ sum (ใช้ * เพื่อไม่ให้ error ถ้ายังไม่มี go.sum)
COPY go.mod go.sum* ./
RUN go mod download

# Copy โค้ดทั้งหมด
COPY . .

# Build binary ให้ชัดเจนมากขึ้น
RUN go build -o main ./cmd/main.go

CMD ["./main"]


