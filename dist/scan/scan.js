import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { __dirname as index_js__dirname } from "../common/index.js";
const scan_traverse = traverse["default"];
const generateCode = (node)=>JSON.stringify(node);
const analyzeFile = (filePath, keyword, result)=>{
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: [
            'jsx',
            "typescript"
        ]
    });
    scan_traverse(ast, {
        CallExpression (_path) {
            if (_path.node.callee.name === keyword || 'MemberExpression' === _path.node.callee.type && _path.node.callee.property.name === keyword) {
                const code_location = `${filePath}#${_path.node.loc?.start.line}:${_path.node.loc?.start.column}`;
                result.push({
                    file_path: filePath,
                    code_location,
                    full_code_location: `${index_js__dirname}/${code_location}`,
                    arguments: _path.node.arguments.map((arg)=>generateCode(arg))
                });
            }
        }
    });
};
const traverseScanDir = (dir, keyword, outDir, result)=>{
    fs.readdirSync(dir).forEach((file)=>{
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) traverseScanDir(fullPath, keyword, outDir, result);
        else if (/\.(js|jsx|ts|tsx)$/.test(file)) analyzeFile(fullPath, keyword, result);
    });
};
const traverseScanDirAsync = (dir, keyword, outDir, result)=>{
    fs.promises.readdir(dir).then((files)=>{
        files.forEach((file)=>{
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) traverseScanDir(fullPath, keyword, outDir, result);
            else if (/\.(js|jsx|ts|tsx)$/.test(file)) analyzeFile(fullPath, keyword, result);
        });
    });
};
const scanDir = (dir, keyword, outDir)=>{
    const result = [];
    traverseScanDir(dir, keyword, outDir, result);
    fs.mkdirSync(outDir, {
        recursive: true
    });
    fs.writeFileSync(`${outDir}/scan_result.json`, JSON.stringify(result, null, 2));
    return result;
};
const scanDirAsync = async (dir, keyword, outDir)=>{
    const result = [];
    traverseScanDirAsync(dir, keyword, outDir, result);
    await fs.promises.mkdir(outDir, {
        recursive: true
    });
    await fs.promises.writeFile(`${outDir}/scan_result.json`, JSON.stringify(result, null, 2));
    return result;
};
export { analyzeFile, generateCode, scanDir, scanDirAsync, traverseScanDir, traverseScanDirAsync };
