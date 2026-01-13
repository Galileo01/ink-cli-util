#!/usr/bin/env node
import { jsx } from "react/jsx-runtime";
import "react";
import { render } from "ink";
import meow from "meow";
import scan from "./scan/index.js";
import diff from "./diff/index.js";
const cli = meow(`
	Usage
	  $ ink-cli-util
      scan  扫描模式
      diff  Diff模式

	Options
    scan 扫描模式
      --keyword,-k  搜索关键词 keyword 
      --dir,-d  搜索目录 dir 默认 './src'  
      --out-dir,-o  文件输出目录 out-dir 默认 './scan-output'


    diff Diff模式

	Examples
	  $ ink-cli-util scan --keyword=useAccess
`, {
    importMeta: import.meta,
    flags: {
        keyword: {
            type: 'string',
            isRequired: true,
            shortFlag: 'k'
        },
        dir: {
            type: 'string',
            defaultValue: './src',
            shortFlag: 'd'
        },
        outDir: {
            type: 'string',
            defaultValue: './scan-output',
            shortFlag: 'o'
        }
    }
});
const [command, ...args] = cli.input;
switch(command){
    case 'scan':
        render(/*#__PURE__*/ jsx(scan, {
            ...cli.flags
        }));
        break;
    case 'diff':
        render(/*#__PURE__*/ jsx(diff, {
            name: `diff-${cli.flags.name}`
        }));
        break;
    default:
        render(/*#__PURE__*/ jsx(scan, {
            ...cli.flags
        }));
}
