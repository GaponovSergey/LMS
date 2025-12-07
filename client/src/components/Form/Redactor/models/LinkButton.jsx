import React, {useRef, useState, useEffect} from "react";
import Hyperlink from "../controllers/Hyperlink";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import "./linkButton.css";

export default function LinkButton({state = false, isFromRedactor = false, isMultiblockSelected = false}) {

    const ref = useRef(null);
    const popupRef = useRef(null);

    useOnClickOutside(ref, ()=> setPanelState(false));

    const [isPanelOpened, setPanelState] = useState(false);
    const [urlState, setUrl] = useState(false);
    const [rangeState, setRange] = useState(null);

    useEffect(()=>{
        if (isPanelOpened && popupRef) {
            const windowWidth = document.documentElement.clientWidth;
            const rect = popupRef.current.getBoundingClientRect();
            console.log("shift")
            let shift = 0;
            if(rect.right > windowWidth) {
                shift = windowWidth - rect.right;
                
                console.log("shift 2")
            }

            if(rect.left < 0) {
                shift = rect.left * -1;
            }

            popupRef.current.style.left = `${popupRef.current.style.left + shift}px`;
        }
    }, [isPanelOpened, popupRef])


    return(
        <div style={{position: isPanelOpened ? "relative" : "" }} onFocus={(e)=> e.preventDefault()} ref={ref} >
            <button className={"link-button"} disabled = { (!isFromRedactor && !isPanelOpened) || state || isMultiblockSelected ? "disabled" : false } onClick={() =>{ 
                
                const selection = document.getSelection();
                setRange(selection.getRangeAt(0));
                if (!state) {
                    setPanelState(!isPanelOpened);
                    console.log("hyperlinkwindow")
                    
                } else {
                    const hyperlink = new Hyperlink({range: selection.getRangeAt(0)});
                    hyperlink.cancelLink()
                }
            }}>&#x1F517;</button>
            {
                isPanelOpened && 
                <div className={"link-popup-form"} ref={popupRef}>
                    <input type={"text"} placeholder={"https://www.example.com"} onInput={e => {
                        setUrl(e.target.value);
                    }} />
                    <button className={"link-button"} onClick={() => {
                        const decorator = new Hyperlink({
                            href: urlState,
                            range: rangeState
                        });
                        decorator.setDecorator();

                        
                    
                        setPanelState(false);
                    }}>➜</button>
                </div>
            }
        </div>
    )
}