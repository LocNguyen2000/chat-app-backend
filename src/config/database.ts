import { Pool } from "pg";
import config from './index'

export const pool = new Pool({
    user: config.psUsername,
    host: config.psHost,
    password: config.psPassword,
    database: config.psDBName,
    port: Number(config.psPort),
})