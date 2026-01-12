import React, { useState, useEffect, useRef } from "react";
import Toggler from "./controllers/Toggler";
import TextExtractor from "./controllers/TextExtractor";
import TextDecorator from "./controllers/TextDecorator";
import Handler from "./controllers/Handler";
import Menu from "./models/Menu";
import "./redactor.css";



export default function Redactor({ref, html = ""}) {
    

    
    const toggler = new Toggler();
    let [state, setState] = useState(toggler.state);

    useEffect(()=>{
        ref.current.innerHTML = html;
        }, [])

    console.log("REDACTOR")

    document.onselectionchange = ()=> {
        console.log("selectionchange")

        

        const brs = document.querySelectorAll('div[data-type="redactor"] br');

        for (let br of brs) {
            if(!br.closest(`*[data-conception="HEADER2"]`)) br.remove();
        }

        const toggler = new Toggler();
        setState(toggler.state);
        
        
        if (toggler.redactor && !toggler.foundationTags.find(elem => elem.dataset?.type === "block") && toggler.isCollapsed) {
            const decorator = new TextDecorator({tagName: "paragraph"});
            const range = decorator.range;
            let wrapper;

            if(decorator.redactor.querySelector(`*[data-conception="PARAGRAPH"]`)) {
                wrapper = decorator.redactor.querySelector(`*[data-conception="PARAGRAPH"]`);
            }  else {
                
                wrapper = decorator.createElement();
                wrapper.append(document.createTextNode(""));
                decorator.redactor.append(wrapper);
            }

            const textNode = decorator.findTextNode(wrapper);
            range.setStart(textNode, 0);
            range.setEnd(textNode, 0);
            decorator.changeSelection();
        }

        if (toggler.redactor) {
            const selection = document.getSelection().getRangeAt(0);
            let y = selection.getBoundingClientRect().y;
            const windowHeight = document.documentElement.clientHeight;

            if (y < 100) {
                y = y >= 0 ? 0 - y : y; 
                window.scrollBy( 0, y - 150);
            }
            if (y > windowHeight - 50) {
                window.scrollBy(0, y - windowHeight + 50);
            }
        }
        
    }

    

    return(
        <div className={"redactor-wrap"}>
            <Menu state={state} className={"menu"}/>
            <div data-type="redactor" spellCheck={false} ref={ref}
            
            onKeyDown = { e => { 
                const handler = new Handler();
                if (!e.code) {
                    handler.virtualKeyboardHandler(e);
                } else  handler.keyHandler(e);
            }}


            onPaste={ (e)=>{
                    e.preventDefault();

                    let paste = (e.clipboardData || document.clipboardData).getData("text");
                    
                    const selected = new TextExtractor();

                    const fragment = document.createElement("span");

                    if (paste.match(/\<*\>/)) {
                        fragment.append(document.createTextNode(paste));
                    } else {
                        const hyperlink = selected.createElement("hyperlink");
                        hyperlink.href = "$&";
                        hyperlink.innerHTML = "$&";
                        const replacement = (hyperlink.outerHTML).replace(/amp;/g, "") + " ";

                        const httpRegExp = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g);
                        
                        const text = paste.replace(httpRegExp, replacement);
                        fragment.innerHTML = text;
                    }
                    
                    console.log("onPaste")
                    console.log(fragment)
                    if (!selected.isCollapsed) selected.extractContent();

                    selected.selection.getRangeAt(0).insertNode(fragment);

                    const start = selected.findTextNode(fragment);
                    const end = selected.findTextNode(fragment, true);

                    fragment.replaceWith(...fragment.childNodes);

                    selected.range.setStart(start, 0);
                    selected.range.setEnd(end, end.data.length);
                    
                    selected.changeSelection();
                    //const selection = document.getSelection();
                    //selection.deleteFromDocument();
                    //selection.getRangeAt(0).insertNode(text);
                }
            }
                
                contentEditable={"plaintext-only"} onInput={(e)=> e.preventDefault()} >
            </div>
        </div>
    );
}