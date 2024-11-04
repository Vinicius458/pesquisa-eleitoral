export default {
  dbUrl: process.env.MONGO_URI || "mongodb://mongodb:27017/poll",
  port: process.env.PORT || 3000,
};
