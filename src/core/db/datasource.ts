import { DataSource } from "typeorm";


const dbUrl = process.env.DATABASE_URL;
console.log(dbUrl);
const user = process.env.USER_DB;
console.log(user);
const pass = process.env.PASS_DB;
console.log(pass);
const mode = process.env.BUILD_MODE ?? 'debug';


export const AppDataSource = new DataSource({
    type: "cockroachdb",
    host:  `${dbUrl}`,
    port: 26257,
    ssl: true,
    username: `${user}`,
    password: `${pass}`,
    database: "defaultdb",
    synchronize: true,
    logging: true,
    // entities: [Organizacion,Metricas,Repositorio,Tribu],
})

