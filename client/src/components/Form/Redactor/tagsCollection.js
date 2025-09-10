const collection = {
    bold: {
        tagName: "STRONG",
        data: {
            type: "inline",
            conception: "BOLD"
        },
        style: {}
    },
    italic: {
        tagName: "EM",
        data: {
            type: "inline",
            conception: "ITALIC"
        },
        style: {}
    },
    underline: {
        tagName: "STRONG",
        data: {
            type: "inline",
            conception: "UNDERLINE"
        },
        style: {
            fontWeight: "inherit",
            textDecoration: "underline"
        }
    },
    paragraph: {
        tagName: "P",
        data: {
            type: "block",
            conception: "PARAGRAPH"
        },
        style: {}
    }
};

export default collection;