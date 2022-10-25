import { DataSource } from "typeorm";

const dbUrl = new URL(process.env.DATABASE_URL);
const user = new URL(process.env.USER_DB);
const pass = new URL(process.env.PASS_DB);

const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    host:  `${dbUrl}`,
    port: 5432,
    ssl: true,
    username: `${user}`,
    password: `${pass}`,
    database: "defaultdb",
    // synchronize: true,
    // logging: true,
    extra: {
        options: routingId
      },
    entities: [],
    subscribers: [],
    migrations: [],
})