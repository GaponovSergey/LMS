const collection = {

    bold: {
        tagName: "STRONG",
        data: {
            type: "inline",
            conception: "BOLD"
        },
        attributes: {},
        style: {}
    },

    italic: {
        tagName: "EM",
        data: {
            type: "inline",
            conception: "ITALIC"
        },
        attributes: {},
        style: {}
    },

    underline: {
        tagName: "STRONG",
        data: {
            type: "inline",
            conception: "UNDERLINE"
        },
        attributes: {},
        style: {
            fontWeight: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "3px"
        }
    },

    textColor: {
        tagName: "SPAN",
        data: {
            type: "inline",
            conception: "TEXTCOLOR"
        },
        attributes: {},
        style: {
            color: "black"
        },
        keyStyle: "color",
        defaultValue: "black",
        values: [
            "black",
            "gray",
            "brown",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "darkBlue",
            "purple",
            "darkViolet"
        ]
    },

    stringColor: {
        tagName: "SPAN",
        data: {
            type: "inline",
            conception: "STRINGCOLOR"
        },
        attributes: {},
        style: {
            backgroundColor: "yellow"
        },
        keyStyle: "backgroundColor",
        defaultValue: "#DCE1E4",
        values: [
            "#DCE1E4",
            "gray",
            "brown",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "darkBlue",
            "purple",
            "darkViolet"
        ]
    },

    fontFamily: {
        tagName: "SPAN",
        data: {
            type: "inline",
            conception: "FONTFAMILY"
        },
        attributes: {},
        style: {
            fontFamily: "Times New Roman"
        },
        keyStyle: "fontFamily",
        defaultValue: "Times New Roman",
        values: [
            "Times New Roman",
            "Arial",
            "Calibri",
            "Cambria"
        ]
    },

    fontSize: {
        tagName: "SPAN",
        data: {
            type: "inline",
            conception: "FONTSIZE"
        },
        attributes: {},
        style: {
            fontSize: "16px"
        },
        keyStyle: "fontSize",
        defaultValue: "16px",
        values: [
            "8px","10px","12px","14px","16px","18px","20px","24px","26px","32px",
        ]
    },

    hyperlink: {
        tagName: "a",
        data: {
            type: "inline",
            conception: "HYPERLINK"
        },
        attributes: {
            target: "_blank"
        },
        style: {
            display: "inline"
        },
        href: null
    },

    paragraph: {
        tagName: "P",
        data: {
            type: "block",
            conception: "PARAGRAPH"
        },
        attributes: {},
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontSize: "16px",
            textAlign: "justify",
            textIndent: "2rem"
        }
    },

    header2: {
        tagName: "H2",
        data: {
            type: "block",
            conception: "HEADER2"
        },
        attributes: {},
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit",
            fontSize: "32px",
            textAlign: "center"
        }
    },

    ul: {
        tagName: "UL",
        data: {
            type: "multiblock",
            conception: "UL"
        },
        attributes: {},
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit",
            fontSize: "16px"
        }
    },

    ol: {
        tagName: "OL",
        data: {
            type: "multiblock",
            conception: "OL"
        },
        attributes: {},
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit",
            fontSize: "16px"
        }
    },

    li: {
        tagName: "LI",
        data: {
            type: "multiblock",
            conception: "LI"
        },
        attributes: {},
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit"
        }
    }
};

export default collection;