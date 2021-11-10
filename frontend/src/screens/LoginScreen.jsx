import React , {useState , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { Row , Col , Button , Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { userLoginAction } from "../actions/userAction";
import Error from "../components/shared/Error";
import Loader from "../components/shared/spinner";


const LoginUser = ({location,history}) => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.userLogin)
    const {loading , userInfo , error} = loginData

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[location,history,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLoginAction(email,password))
    }

    return(
        <>
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Error message={error} variant="danger"/>}
            {loading && <Loader />}
            <Form className="w-75 my-4" onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        password="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                </Form.Group>
                <Button variant="dark" type="submit">Sign In</Button>
            </Form>
        <Row>
            <Col>
            New Customer ? <Link exact to="/register">Create new account</Link>
            </Col>
        </Row>
        </FormContainer>
        </>
    )
}

export default LoginUser
