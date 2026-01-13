import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Box, Text, render, useFocus } from "ink";
function Focus() {
    return /*#__PURE__*/ jsxs(Box, {
        flexDirection: "column",
        padding: 1,
        children: [
            /*#__PURE__*/ jsx(Box, {
                marginBottom: 1,
                children: /*#__PURE__*/ jsx(Text, {
                    children: "Press Tab to focus next element, Shift+Tab to focus previous element, Esc to reset focus."
                })
            }),
            /*#__PURE__*/ jsx(Item, {
                label: "First"
            }),
            /*#__PURE__*/ jsx(Item, {
                label: "Second"
            }),
            /*#__PURE__*/ jsx(Item, {
                label: "Third"
            })
        ]
    });
}
function Item({ label }) {
    const { isFocused } = useFocus();
    return /*#__PURE__*/ jsxs(Text, {
        children: [
            label,
            " ",
            isFocused && /*#__PURE__*/ jsx(Text, {
                color: "green",
                children: "(focused)"
            })
        ]
    });
}
render(/*#__PURE__*/ jsx(Focus, {}));
