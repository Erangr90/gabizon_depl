import knex from 'knex'

export const kdb = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
})
