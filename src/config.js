const { config } = require("dotenv");

config();

module.exports = {
  SECRET: "eshop-api",
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || "",
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID || "",
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY || "",
};
