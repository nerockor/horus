const fs = require('fs')
const path = require('path')

const logFile = path.resolve('./server-crash.log')

try {
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] Attempting to boot server/server.js...\n`)
} catch (e) {
  console.error('Failed to write to log file:', e)
}

import('./server/server.js').catch((error) => {
  try {
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] FATAL CRASH DURING BOOT:\n${error.stack || error}\n`)
  } catch (e) {
    console.error('Failed to log fatal crash:', e)
  }
  console.error('Fatal crash during boot:', error)
  process.exit(1)
})
