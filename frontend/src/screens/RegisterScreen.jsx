import React , {useState , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { Row , Col , Button , Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { userRegisterAction } from "../actions/userAction";
import Error from "../components/shared/Error";
import Loader from "../components/shared/spinner";


const RegisterUser = ({location,history}) => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [message , setMessage] = useState("")

    const dispatch = useDispatch()
    const loginData = useSelector(state => state.userRegister)
    const {loading , userInfo , error} = loginData

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[location,history,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Password does not match")
        }else{
            dispatch(userRegisterAction(name,email,password))
        }
    }

    return(
        <>
        <FormContainer>
            <h1>Register</h1>
            {error && <Error message={error} variant="danger"/>}
            {loading && <Loader />}
            {message && <Error message={message} variant="danger" />}
            <Form className="w-75 my-4" onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                         />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Enter Email-Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter Email-Address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmpassword"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                         />
                </Form.Group>
                <Button variant="dark" type="submit">Sign In</Button>
            </Form>
        <Row>
            <Col>
            Already have an account ! ? <Link exact to="/login">Login</Link>
            </Col>
        </Row>
        </FormContainer>
        </>
    )
}

export default RegisterUser
