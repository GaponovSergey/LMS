import React from "react";
import TextAlign from "../controllers/TextAlign";
import "./textAlignButton.css";

export default function TextAlignToggler({state, isFromRedactor}) {

    const setAlign = (align) => {
        return ()=> {
            const textAlign = new TextAlign();
            textAlign.setAlign(align);
        }
    }

    return(
        <div className={"align-buttons-grid"} onFocus={e => e.preventDefault()}>
            
            <button 
                className={`align-button left ${ state === "left" ? 'align-button-pushed' : 'align-button-unpushed'}`} 
                onClick={setAlign("left")} 
                disabled = { !isFromRedactor ? "disabled" : false }>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            </button>
            <button 
                className={`align-button center ${ state === "center" ? 'align-button-pushed' : 'align-button-unpushed'}`} 
                onClick={setAlign("center")}
                disabled = { !isFromRedactor ? "disabled" : false }>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            </button >
            <button 
                className={`align-button right ${ state === "right" ? 'align-button-pushed' : 'align-button-unpushed'}`} 
                onClick={setAlign("right")}
                disabled = { !isFromRedactor ? "disabled" : false }>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            </button>
            <button 
                className={`align-button ${ state === "justify" ? 'align-button-pushed' : 'align-button-unpushed'}`} 
                onClick={setAlign("justify")}
                disabled = { !isFromRedactor ? "disabled" : false }>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<br/>
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            </button>
        </div>
    )    
}