import React, {useRef} from "react";
import Redactor from "../../Form/Redactor";


export default function TryRedactor() {

    const ref = useRef(null)

    return(
        <Redactor ref={ref} />
    )
}