// infra/pgReplicationMonitor.ts
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function checkReplicationLag() {
  const res = await pool.query(`SELECT now() - pg_last_xact_replay_timestamp() AS replication_lag`);
  const lag = res.rows[0]?.replication_lag;
  console.log('Replication lag:', lag);
  return lag;
}
