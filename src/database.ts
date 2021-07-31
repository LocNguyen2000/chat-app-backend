import { Pool } from "pg";
import config from './config'

export const pool = new Pool({
    user: config.psUsername,
    host: config.psHost,
    password: config.psPassword,
    database: config.psDBName,
    port: Number(config.psPort),
})