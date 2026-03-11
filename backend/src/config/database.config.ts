export const databaseConfig = {
  driver: "postgresql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "zedtrago",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  schema: "accounting",
  synchronize: false,
  ssl: false,
  pool: {
    min: 2,
    max: 20,
  },
};
