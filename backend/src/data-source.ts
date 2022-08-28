import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mkoffice",
  database: "focus",
  entities: ["src/entity/*.ts"],
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: true,
  synchronize: true,
});

export default dataSource;
