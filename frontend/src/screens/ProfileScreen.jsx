import React , {useState , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { Row , Col , Button , Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userProfileAction , userUpdateProfileAction } from "../actions/userAction";
import Error from "../components/shared/Error";
import Loader from "../components/shared/spinner";


const UserProfile = ({location,history}) => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [message , setMessage] = useState("")

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const userProfile = useSelector(state => state.userProfile)
    const { userInfo } = userLogin
    const {loading , user, error} = userProfile


    useEffect(()=>{ 
        if(!userInfo){
            history.push("/login")
        }
        if(!user.name){
             dispatch(userProfileAction())    
        }else{
            setEmail(user.email)
            setName(user.name)

        }
            
    },[userInfo,dispatch,loading])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdateProfileAction({name,email,password}))
        if(password !== confirmPassword){
            setMessage('password does not match')
        }
    }

    return(
        <>
      <Container>
        <Row>
            <Col md={4}>
            <h1>Profile</h1>
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
                    <Button variant="dark" type="submit">Update</Button>
                </Form> 
            </Col>
            <Col md={8}>
                <h1>My Orders</h1>
            </Col>
        </Row>
    </Container>
        
        </>
    )
}

export default UserProfile
