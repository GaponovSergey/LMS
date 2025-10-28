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
        style: {
            backgroundColor: "yellow"
        },
        keyStyle: "backgroundColor",
        defaultValue: "yellow",
        values: [
            "white",
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
        style: {
            fontSize: "16px"
        },
        keyStyle: "fontSize",
        defaultValue: "16px",
        values: [
            "8px","10px","12px","14px","16px","18px","20px","24px","26px","32px",
        ]
    },

    paragraph: {
        tagName: "P",
        data: {
            type: "block",
            conception: "PARAGRAPH"
        },
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontSize: "16px"
        }
    },

    header2: {
        tagName: "H2",
        data: {
            type: "block",
            conception: "HEADER2"
        },
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit",
            fontSize: "32px"
        }
    },

    ul: {
        tagName: "UL",
        data: {
            type: "multiblock",
            conception: "UL"
        },
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
        style: {
            minHeight: "1em",
            overflowWrap: "break-word",
            fontFamily: "Times New Roman",
            fontWeight: "inherit"
        }
    }
};

export default collection;