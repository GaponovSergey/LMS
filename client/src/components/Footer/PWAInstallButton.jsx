import React, {useState, useEffect} from "react";


export default function PWAInstallButton() {

    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect( ()=> {
        window.addEventListener("beforeinstallprompt", (e)=> {
            console.log("prompt")
            //e.preventDefault();
            setInstallPrompt(e);
        })
  }, [])

    const installHandler = () => {
        console.log("install")
        
        installPrompt.prompt()
    }


    return(
        <>
            {installPrompt &&
                <div className={"footer-pwabutton-container"}>
                    <button className={"footer-pwabutton-button"} onClick={installHandler}>Установить приложение</button>
                </div> 
            }
        </> 
    )
}