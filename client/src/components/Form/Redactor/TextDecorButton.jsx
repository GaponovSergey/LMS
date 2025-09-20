import React from "react";
import TextDecorator from "./TextDecorator"
import "./redactor.css";


const TextDecorButton = ({state, isFromRedactor = false, conception, children}) => {

    return (
        
        <button disabled = { !isFromRedactor ? "disabled" : false } className={`TextDecorButton ${state && "TextDecorButton-pushed"}`} onClick={()=> { 
                    const textDecorator = new TextDecorator(conception);
                    if (!state) textDecorator.setDecorator();
                    else textDecorator.clearDecorator();
                }}>
            {children}
        </button> 
        
    )
    
}

export default TextDecorButton;