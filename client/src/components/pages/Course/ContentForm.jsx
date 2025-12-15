import React, {useRef, useState} from "react";
import Redactor from "../../Form/Redactor"
import Files from "../../Form/Files";


export default function ContentForm({redactorRef, title, html, handler, children}) {

    const [title, setTitle] = useState("");
    const redactorRef = useRef(null);
    

    return(
        <div >
            <p>Название:</p>
            <input type={"text"} onChange={e => setTitle(e.target.value)} defaultValue={title} />
                    
            <Redactor ref={redactorRef} html={html} />
                
            <Files />

            {children}

            <button onClick={() => handler({
                    title,
                    content: redactorRef.current.textContent,
                    html: redactorRef.current.innerHTML
            })}>Создать</button>
        </div>
            
    )
}