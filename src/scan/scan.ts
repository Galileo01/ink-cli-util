import fs from 'fs'
import path from 'path'
import parser from '@babel/parser'
import _traverse from '@babel/traverse'

import { __dirname } from '../common'

// @ts-expect-error 忽略 default 属性不存在，实际是存在的；CJS->ESM
const traverse: typeof _traverse = _traverse.default

export type ScanResult = {
  file_path: string
  code_location: string
  full_code_location: string
  arguments: Array<string>
}

// 生成参数代码片段
export const generateCode = (node: any) => {
  // 简化示例：实际可用 @babel/generator
  return JSON.stringify(node)
}

// 分析单个文件
export const analyzeFile = (filePath: string, keyword: string, result: Array<ScanResult>) => {
  const code = fs.readFileSync(filePath, 'utf-8')
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  })

  traverse(ast, {
    CallExpression(_path) {
      if (
        // @ts-expect-error 忽略 name
        _path.node.callee.name === keyword ||
        // @ts-expect-error 忽略 name
        (_path.node.callee.type === 'MemberExpression' && _path.node.callee.property.name === keyword)
      ) {
        const code_location = `${filePath}#${_path.node.loc?.start.line}:${_path.node.loc?.start.column}`
        result.push({
          file_path: filePath,
          code_location,
          full_code_location: `${__dirname}/${code_location}`,
          arguments: _path.node.arguments.map((arg) => generateCode(arg)),
        })
      }
    },
  })
}

// 执行扫描
// 递归扫描目录
export const traverseScanDir = (dir: string, keyword: string, outDir: string, result: Array<ScanResult>) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      traverseScanDir(fullPath, keyword, outDir, result)
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      // console.log('analyzeFile fullPath', fullPath)
      analyzeFile(fullPath, keyword, result)
    }
  })
}

export const traverseScanDirAsync = (dir: string, keyword: string, outDir: string, result: Array<ScanResult>) => {
  fs.promises.readdir(dir).then((files) => {
    files.forEach((file) => {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        traverseScanDir(fullPath, keyword, outDir, result)
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        // console.log('analyzeFile fullPath', fullPath)
        analyzeFile(fullPath, keyword, result)
      }
    })
  })
}

export const scanDir = (dir: string, keyword: string, outDir: string) => {
  // console.log('scanDir', {
  //   dir,
  //   keyword,
  //   outDir,
  // })
  const result: Array<ScanResult> = []
  traverseScanDir(dir, keyword, outDir, result)
  // 确保输出目录存在
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(`${outDir}/scan_result.json`, JSON.stringify(result, null, 2))
  // console.log(JSON.stringify(result, null, 2))
  return result
}

export const scanDirAsync = async (dir: string, keyword: string, outDir: string) => {
  // console.log('scanDirAsync', {
  //   dir,
  //   keyword,
  //   outDir,
  // })
  const result: Array<ScanResult> = []
  traverseScanDirAsync(dir, keyword, outDir, result)
  // 确保输出目录存在
  await fs.promises.mkdir(outDir, { recursive: true })
  // fs.writeFileSync(`${outDir}/scan_result.json`, JSON.stringify(result, null, 2))
  await fs.promises.writeFile(`${outDir}/scan_result.json`, JSON.stringify(result, null, 2))

  // console.log(JSON.stringify(result, null, 2))
  return result
}
