console.log(`PORT: ${process.env.PORT}`)
console.log(`BD_HOST: ${process.env.DB_HOST}`)
console.log(`DB_PORT: ${process.env.DB_PORT}`)
console.log(`BD_NAME: ${process.env.DB_NAME}`)
console.log(`DB_USER: ${process.env.DB_USER}`)
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`)
console.log(`DB_CUSTER: ${process.env.DB_CLUSTER}`)

import { registerAs } from "@nestjs/config";

export default registerAs('default', () => {
    return {
        database: {
        dbName: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        cluster: process.env.DB_CLUSTER,
      },
    }
  })