import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerLink } from "../store/navigatorSlice";

export default function useScrollTo(ref, linkName, handler = ()=> {}) {

    const dispatch = useDispatch();
    const trigger = useSelector( state => state.navigator.current);

   useEffect( ()=> {

        if (linkName === trigger) {
            let y = ref.current.getBoundingClientRect().y;

            window.scrollBy( 0, y - 100);

            dispatch(triggerLink(""));

            handler();
        }
    }, [trigger, ref, linkName])
}