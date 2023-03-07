import React, { useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, signinUser  } from "../store/slices/userSlice"
import {
  useNavigate
} from "react-router-dom";
import Spinner from '../components/Spinner'
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSecureEntry, setisSecureEntry] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const status = useSelector(getUserStatus)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signinUser({ email, password })).unwrap()
      navigate('/dashboard');
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  return (
    <div> 
      <section>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form onSubmit={handleSubmit} className="login100-form validate-form"> 
                <div style={{ display: "flex", justifyContent: "center" }} className="mt-3 mb-4">
                  <div style={{  width: "100%" }} className="logo text-center ">
                    <img src="/assets/images/logo.png" alt="logo" className="img-fluid" />
                  </div>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                  <input className="input100" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <span className="btn-show-pass">
                    <i className={isSecureEntry ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => { setisSecureEntry((prev) => !prev) }} />
                  </span>
                  <input className="input100" placeholder='Enter Password' type={isSecureEntry ? "password" : "text"} name="pass" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button type='submit' className="login100-form-btn">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login