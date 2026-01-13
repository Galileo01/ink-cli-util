import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import ink_spinner from "ink-spinner";
import { scanDir } from "./scan.js";
const ScanCommand = (props)=>{
    const { keyword, dir = './src', outDir = './output' } = props;
    const [result, setResult] = useState();
    useEffect(()=>{
        const _result = scanDir(dir, keyword, outDir);
        setResult(_result);
    }, [
        dir,
        keyword,
        outDir
    ]);
    return /*#__PURE__*/ jsxs(Box, {
        flexDirection: "column",
        children: [
            /*#__PURE__*/ jsxs(Box, {
                children: [
                    /*#__PURE__*/ jsxs(Text, {
                        children: [
                            "scan, ",
                            /*#__PURE__*/ jsxs(Text, {
                                color: "green",
                                children: [
                                    "keyword:",
                                    keyword || '--',
                                    " "
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx(Text, {
                        children: /*#__PURE__*/ jsxs(Text, {
                            color: "green",
                            children: [
                                "dir:",
                                dir || '--',
                                " "
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx(Text, {
                        children: /*#__PURE__*/ jsxs(Text, {
                            color: "green",
                            children: [
                                "outDir:",
                                outDir || '--',
                                " "
                            ]
                        })
                    })
                ]
            }),
            result ? /*#__PURE__*/ jsxs(Box, {
                flexDirection: "column",
                children: [
                    /*#__PURE__*/ jsx(Box, {
                        children: /*#__PURE__*/ jsx(Text, {
                            children: "扫描结果如下:"
                        })
                    }),
                    /*#__PURE__*/ jsx(Box, {
                        children: /*#__PURE__*/ jsxs(Text, {
                            children: [
                                JSON.stringify(result, null, 2) || '--',
                                " "
                            ]
                        })
                    })
                ]
            }) : /*#__PURE__*/ jsxs(Text, {
                color: "yellow",
                children: [
                    /*#__PURE__*/ jsx(Text, {
                        color: "green",
                        children: /*#__PURE__*/ jsx(ink_spinner, {
                            type: "dots"
                        })
                    }),
                    "Scanning..."
                ]
            })
        ]
    });
};
const scan = ScanCommand;
export { scan as default };
