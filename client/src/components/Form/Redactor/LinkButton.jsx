import React, {useState, useEffect} from "react";
import Hyperlink from "./Hyperlink";

export default function LinkButton({state = false, isFromRedactor = false, isMultiblockSelected = false}) {

    const [isPanelOpened, setPanelState] = useState(false);
    const [urlState, setUrl] = useState(false);
    const [rangeState, setRange] = useState(null);

    return(
        <div style={{position: "relative"}} onFocus={(e)=> e.preventDefault()}>
            <button disabled = { (!isFromRedactor && !isPanelOpened) || isMultiblockSelected ? "disabled" : false } onClick={() =>{ 
                
                const selection = document.getSelection();
                setRange(selection.getRangeAt(0));
                if (!state) {
                    setPanelState(!isPanelOpened);
                } else {
                    const hyperlink = new Hyperlink({range: selection.getRangeAt(0)});
                    hyperlink.cancelLink()
                }
            }}>Ссылка</button>
            {
                isPanelOpened && 
                <div className="popupWindow">
                    <input type={"text"} onInput={e => {
                        setUrl(e.target.value);
                    }} />
                    <button onClick={() => {
                        const decorator = new Hyperlink({
                            href: urlState,
                            range: rangeState
                        });
                        decorator.setDecorator();
                    
                        setPanelState(false);
                    }}>Ввод</button>
                </div>
            }
        </div>
    )
}