import React from "react";
import TextColor from "./TextColor";
import StringColor from "./StringColor";
import collection from "../tagsCollection";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";
import List from "../controllers/List";
import LinkButton from "./LinkButton";
import TextAlignToggler from "./TextAlignToggler";
import TextDecorButton from "./TextDecorButton";
import Header from "../controllers/Header";
import "./menu.css";


export default function Menu({state, className = null}) {

    const setHeader = ()=> {
        const decorator = new Header();
        decorator.setHeader();
    };
    
    const setList = (tag)=> {
    
        return ()=> {
            const list = new List(tag);
            list.setList();
        }; 
    };

    return(
        <div className={className} >
            <div className={"decorator-container"}>
                <div className={"decorator-family-container"}>
                    <FontFamily isFromRedactor={state.isFromRedactor} state={state.fontFamily} concept={collection.fontFamily} />
                </div>
                <div className={"decorator-size-container"}>
                    <FontSize isFromRedactor={state.isFromRedactor} state={state.fontSize} concept={collection.fontSize} /> 
                </div>
                <LinkButton state={state.hyperlink} isFromRedactor={state.isFromRedactor} isMultiblockSelected={state.isMultiblockSelected} />
                <TextDecorButton className={"decorator-toggler"} classNamePushed={"decorator-toggler-pushed"} conception="bold" isFromRedactor={state.isFromRedactor} state={state.bold}>
                    <b>b</b>
                </TextDecorButton>
                <TextDecorButton className={"decorator-toggler"} classNamePushed={"decorator-toggler-pushed"} conception="italic" isFromRedactor={state.isFromRedactor} state={state.italic}>
                    <i>i</i>
                </TextDecorButton>
                <TextDecorButton className={"decorator-toggler"} classNamePushed={"decorator-toggler-pushed"} conception="underline" isFromRedactor={state.isFromRedactor} state={state.underline}>
                    <u>u</u>
                </TextDecorButton>
                <div className={"decorator-textcolor-container"}>
                    <TextColor isFromRedactor={state.isFromRedactor} state={state.textColor} concept={collection.textColor} />
                </div>
                <div className={"decorator-stringcolor-container"}>
                    <StringColor isFromRedactor={state.isFromRedactor} state={state.stringColor} concept={collection.stringColor} />
                </div>
            </div>
            <TextAlignToggler state={state.textAlign} isFromRedactor={state.isFromRedactor}/>
            <div className={"blockcreator-container"}>
                <button className={"blockcreator-button header-button"} onClick={setHeader} disabled = { !state.isFromRedactor || state.blockElement === "HEADER2" || state.isMultiblockSelected ? "disabled" : false }>
                    <span style={{display: 'inline'}}>
                        <span className={"header-button-inner-headline"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span><br /><br />
                        <span className={"header-button-inner"}>
                            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
                        </span>
                    </span>
                </button>
                <button className={"blockcreator-button ol-button"} onClick={setList("ol")} disabled = { !state.isFromRedactor || state.isMultiblockSelected ? "disabled" : false }>
                    <span>
                        <b>1.</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span><br/>
                        <b>2.</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span><br/>
                        <b>3.</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>
                    </span>
                </button>
                <button className={"blockcreator-button ol-button"} onClick={setList("ul")} disabled = { !state.isFromRedactor || state.isMultiblockSelected ? "disabled" : false }>
                    <span>
                        <b>&#x2022;</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span><br/>
                        <b>&#x2022;</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span><br/>
                        <b>&#x2022;</b> <span className={"ol-button-inner"}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>
                    </span>
                </button>
            </div>
        </div>
    )
}