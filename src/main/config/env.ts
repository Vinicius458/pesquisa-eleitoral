export default {
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: 3306,
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "123",
  dbName: process.env.DB_NAME || "ELEITORAL",
  rabbitUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  port: process.env.PORT || 3000,
};