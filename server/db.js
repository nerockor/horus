import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, 'database.sqlite')
const db = new (sqlite3.verbose().Database)(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err)
  } else {
    console.log('Database connected at:', dbPath)
  }
})

// Run a query (INSERT, UPDATE, DELETE) using prepared statements
export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID, changes: this.changes })
      }
    })
  })
}

// Get a single row using prepared statements
export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

// Get all matching rows using prepared statements
export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

// Close the database connection
export function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export default { run, get, all, close }
