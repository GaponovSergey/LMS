import React from "react";
import TextDecorator from "../controllers/TextDecorator"
import "../redactor.css";


const TextDecorButton = ({state, isFromRedactor = false, conception, className = null, classNamePushed = null, children}) => {

    return (
        
        <button disabled = { !isFromRedactor ? "disabled" : false } className={`${className} ${state && classNamePushed}`} onClick={()=> { 
                    const textDecorator = new TextDecorator({tagName: conception});
                    if (!state) textDecorator.setDecorator();
                    else textDecorator.clearDecorator();
                }}>
            {children}
        </button> 
        
    )
    
}

export default TextDecorButton;