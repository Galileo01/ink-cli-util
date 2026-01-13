#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';

import ScanCommand from './scan';
import DiffCommand from './diff';

const cli = meow(
  `
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
`,
  {
    importMeta: import.meta,
    flags: {
      keyword: {
        type: 'string',
        isRequired: true,
        shortFlag: 'k',
      },
      dir: {
        type: 'string',
        defaultValue: './src',
        shortFlag: 'd',
      },
      outDir: {
        type: 'string',
        defaultValue: './scan-output',
        shortFlag: 'o',
      },
    },
  }
);

// render(<App name={cli.flags.name} />)

// 获取子命令（第一个参数）
const [command, ...args] = cli.input;

switch (command) {
  case 'scan':
    render(<ScanCommand {...cli.flags} />);
    break;
  case 'diff':
    render(<DiffCommand name={`diff-${cli.flags.name}`} />);
    break;
  default:
    render(<ScanCommand {...cli.flags} />);
}
