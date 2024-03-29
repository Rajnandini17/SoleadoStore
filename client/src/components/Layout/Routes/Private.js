import {useState, useEffect} from "react";
import {useAuth} from "../../../context/auth";
import {Outlet} from "react-router-dom";
import axios from "axios";
import Spinner  from "../Spinner";

const PrivateRoute = () => {
    const [ok, setOk] = useState(true)
    const[auth] = useAuth()

    useEffect(()=> {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
                headers: {
                    'Authorization': auth?.token.auth
                }
            }); 
           
            if(res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        };
        if(auth?.token.auth) authCheck()
    }, [auth?.token.auth]);
    return ok ? <Outlet/> : <Spinner/>
}

export default PrivateRoute;