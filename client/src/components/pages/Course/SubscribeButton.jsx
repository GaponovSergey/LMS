import React, {useEffect, useState} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { subscribePush } from "../../../store/courseSlice";


export default function SubscribeButton({groupId, subscribed}) {

    const initialState = {manager: null, permissionState: "denied"}

    const [pushManager, setPushManager] = useState(initialState);
    const dispatch = useDispatch();
    

    useEffect( ()=> {
        if (!pushManager.manager) initPushManager(setPushManager);
    }, [pushManager])

    const handler = async ()=> {
        try {
            const data = {groupId, pushSubscription: null}
            if (pushManager.permissionState === "prompt") {
                data.pushSubscription = await pushManager.manager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_PUBLIC_KEY)
                });
            }

            console.log("data.pushSubscription")
            console.log(data.pushSubscription)
            

            await dispatch(subscribePush(data))

            setPushManager(state => {
                return {...state, permissionState: state.manager.permissionState}
            });

        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>

            {pushManager.permissionState !== "denied" &&
                <div>
                    {!subscribed ? 
                        
                        <button className="course-subscribebutton" onClick={handler}>Подписаться на push-уведомления</button>
                         :
                       <button className="course-subscribebutton" onClick={ ()=> dispatch(subscribePush({groupId, subscribed: false}))}>Отписаться от push-уведомлений</button>
                        
                
                    }
                </div>
            }
        </>
    )

}


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function initPushManager(setState) {
    try {
        if (!navigator.serviceWorker || !window.PushManager) return;


        const serviceWorker = await navigator.serviceWorker.ready;
        console.log("serviceWorker.pushManager")
        const manager = serviceWorker.pushManager;
        const permissionState = await manager.permissionState({userVisibleOnly: true});
        console.log(permissionState)
        

        return setState({manager, permissionState})

        
    } catch (err) {
        console.log(err)
    }
}


