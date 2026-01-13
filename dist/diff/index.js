import { jsxs } from "react/jsx-runtime";
import "react";
import { Text } from "ink";
const APP = (props)=>{
    const { name } = props;
    return /*#__PURE__*/ jsxs(Text, {
        children: [
            "Scan, ",
            /*#__PURE__*/ jsxs(Text, {
                color: "green",
                children: [
                    name || '--',
                    " "
                ]
            })
        ]
    });
};
const diff = APP;
export { diff as default };
