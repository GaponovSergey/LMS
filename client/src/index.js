import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/";




/*

async function registerSW() {
    if ("serviceWorker" in navigator) {

        window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: "сервисВоркер поддерживается"}}));
        
        try {
            await navigator.serviceWorker.register("/sw.js")
            window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: "сервисВоркер зарегистрирован"}}))

            let activating = await navigator.serviceWorker.ready;

            window.dispatchEvent(new CustomEvent("newMessage",{
                detail: {
                    text:`состояние готовности сервисВоркера: ${activating.active.state}`
                }
            }
            ))
        } catch (e) {
            window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: e}}))
        }
    }
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();      
        defferedPrompt = e; 
        document.getElementsByTagName('footer')[0].style.display = "flex";   
        installButton.hidden = 0;
        
        
        installButton.addEventListener('click', async () => {
        
            defferedPrompt.prompt();
        
            defferedPrompt = null;
            installButton.hidden = 1;
            document.getElementsByTagName('footer')[0].style.display = "none";
          });
    }); 
}
registerSW();

window.addEventListener('appinstalled', ()=> {installButton.hidden = 1; document.getElementsByTagName('footer')[0].style.display = "none";});

*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

