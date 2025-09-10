import React from "react";
import TextDecorator from "./TextDecorator"
import "./redactor.css";


const TextDecorButton = ({state, conception, children}) => {

    return (
        
        <button className={state? "TextDecorButton-pushed" : "TextDecorButton"} onClick={()=> { 
                    const textDecorator = new TextDecorator(conception);
                    if (!state) textDecorator.setDecorator();
                    else textDecorator.clearDecorator();
                }}>
            {children}
        </button> 
        
    )
    
}

export default TextDecorButton;