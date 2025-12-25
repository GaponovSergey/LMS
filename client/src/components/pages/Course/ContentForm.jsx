import React, {useRef, useState} from "react";
import Redactor from "../../Form/Redactor";


export default function ContentForm({title, html, handler, children}) {

    const [titleState, setTitle] = useState(title);
    
    const redactorRef = useRef(null);
    return(
        <div >
            <p>Название:</p>
            <input type={"text"} onChange={e => setTitle(e.target.value)} defaultValue={title} />
                    
            <Redactor ref={redactorRef} html={html} />
                
            

            {children}

            <button onClick={() => handler({
                    title: titleState,
                    content: redactorRef.current.textContent,
                    html: redactorRef.current.innerHTML
            })}>Создать</button>
        </div>
            
    )
}