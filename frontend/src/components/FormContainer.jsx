import React from "react"
import { Container , Row ,Col } from "react-bootstrap"

const FormContainer = ({children}) => {


    return(
        <>
        <Container>
            <Row>
                <Col md={6} className="offset-3 form_div d-flex align-items-center flex-column justify-content-center ">
                    {children}
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default FormContainer