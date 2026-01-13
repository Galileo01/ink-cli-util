import path from 'path'
import { fileURLToPath } from 'url'

// ESM 环境下，__filename 和 __dirname 不存在，需要手动计算
export const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
export const __dirname = path.dirname(__filename)

// const __dirname2 = path.resolve(path.dirname(''))
// const __dirname3 = process.env.PWD
// console.log('dev __dirname', __dirname, __filename, __dirname2, __dirname3)
