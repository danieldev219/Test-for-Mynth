# Microservices Assignment

## Overview
This project consists of two microservices:
- **Service A**: Sends messages to Service B and receives messages from Service B.
- **Service B**: Sends messages to Service A and receives messages from Service A.

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) (for running RabbitMQ)

---

## Setup
### 1. Clone the Repository
```bash
git clone https://github.com/danieldev219/Test-for-Mynth.git
cd microservices
```
### 2. Install Dependencies
Install dependencies for both services:
```bash
cd service-a && npm install
cd ../service-b && npm install
```
### 3. Start RabbitMQ
Start RabbitMQ using Docker:
```bash
docker run -d --hostname my-rabbit --name some-rabbitmq -p 5672:5672 rabbitmq:3
```

### 4. Running the Services
#### Run Service A
Start Service A on port 3000:
#### Run Service B
Start Service B on port 4000:
```bash
cd serviceA && npm start
cd ../serviceB && npm start
```

---

## Testing the Services
### 1. Send a message from Service A to Service B:
```bash
curl -X POST http://localhost:3000/send-to-b -H "Content-Type: application/json" -d '{"message": "Hello from A"}'
```

### 2. Send a message from Service B to Service A:
```bash
curl -X POST http://localhost:4000/send-to-a -H "Content-Type: application/json" -d '{"message": "Hello from B"}'
```

---
## API Endpoints
### Service A
<h4>POST /send-to-b: Send a message to Service B.</h4>
<h4>Request Body:</h4>

```bash
{
  "message": "Your message here"
}
```

### Service B
<h4>POST /send-to-a: Send a message to Service A.</h4>
<h4>Request Body:</h4>

```bash
{
  "message": "Your message here"
}
```

---

## **Folder Structure**
```
microservices/
  ├── serviceA/
  │   ├── src/
  │   │   ├── server.ts
  │   │   ├── rabbitmq.ts
  │   ├── package.json
  │   ├── tsconfig.json
  ├── serviceB/
  │   ├── src/
  │   │   ├── server.ts
  │   │   ├── rabbitmq.ts
  │   ├── package.json
  │   ├── tsconfig.json
  ├── shared/
  │   ├── types/
  │   │   ├── message.ts
  ├── docker-compose.yml
  ├── README.md
```
