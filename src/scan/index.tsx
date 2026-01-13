import * as React from 'react'
import { Text, Box } from 'ink'
import Spinner from 'ink-spinner'

import { scanDir, scanDirAsync, ScanResult } from './scan'

export type ScanCommandProps = {
  /** 搜索关键词 keyword */
  keyword: string
  /** 搜索目录 dir */
  dir?: string
  /** 文件输出目录 out-dir */
  outDir?: string
}

const ScanCommand = (props: ScanCommandProps) => {
  const { keyword, dir = './src', outDir = './output' } = props

  const [result, setResult] = React.useState<ScanResult[]>()

  React.useEffect(() => {
    const _result = scanDir(dir, keyword, outDir)
    setResult(_result)
  }, [dir, keyword, outDir])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>
          scan, <Text color="green">keyword:{keyword || '--'} </Text>
        </Text>
        <Text>
          <Text color="green">dir:{dir || '--'} </Text>
        </Text>
        <Text>
          <Text color="green">outDir:{outDir || '--'} </Text>
        </Text>
      </Box>
      {result ? (
        <Box flexDirection="column">
          <Box>
            <Text>扫描结果如下:</Text>
          </Box>
          <Box>
            <Text>{JSON.stringify(result, null, 2) || '--'} </Text>
          </Box>
        </Box>
      ) : (
        <Text color="yellow">
          <Text color="green">
            <Spinner type="dots" />
          </Text>
          Scanning...
        </Text>
      )}
    </Box>
  )
}

export default ScanCommand
