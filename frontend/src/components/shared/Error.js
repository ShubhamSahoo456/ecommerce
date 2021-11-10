import React from "react";
import { Alert } from "react-bootstrap";

const Error = ({variant,message}) => {

    return(
        <>
        <Alert className="text-center" variant={variant}>
            {message}
        </Alert>
        </>
    )
}

export default Error