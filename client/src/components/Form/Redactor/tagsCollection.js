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
    textColor: {
        tagName: "SPAN",
        data: {
            type: "inline",
            conception: "TEXTCOLOR"
        },
        style: {
            color: "black"
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