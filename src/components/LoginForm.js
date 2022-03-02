import React, { useState } from 'react';
import './LoginForm.css';
import loginFormValidation from './loginFormValidation';
import axios from'axios';
import { withRouter } from 'react-router-dom';

function LoginForm(props) {
      const [adminData, setadminData] = useState({
            username: "",
            password: ""
      })
      const [errors, seterrors] = useState({})

      let changeData = (event) => {
            setadminData({
                  ...adminData,
                  [event.target.name]: event.target.value
            })
      }
      let validateData = () => {
            seterrors(loginFormValidation(adminData))
      }
      let saveData = async(event) => {
            event.preventDefault()
            if (Object.keys(errors).length === 0) {
                  try {
                        let res= await axios.post("http://localhost:8085/admin/loginAuthentication",adminData)
                  if(!res.data.error){
                        localStorage.setItem("jwtToken",res.data.token);
                        localStorage.setItem("role",res.data.role)
                        props.login()
                        let role = localStorage.getItem("role");
                        if (role === "ROLE_SUPERADMIN") {
                              props.history.push("/superadmin")
                            } else if (role === "ROLE_ADMIN") {
                              props.history.push("/admin")
                            }    
                  }else{
                           seterrors({error:res.data.message})
                  }
                  } catch (error) {
                        console.log(error);
                        alert("internal server error")
                        
                  }
            }

      }
      
      return (
            <div className="global-container">
                  <div className="card login-form">
                        <div className="card-body">
                              <h3 className="card-title text-center">Log in</h3>
                              <div className="card-text">
                              {errors.error && <p className='alert alert-danger'>{errors.error}</p>}
                                    <form className='' onSubmit={saveData}>
                                          
                                          <div className="form-group">
                                                <label className="move" htmlFor="username">Username</label>
                                                <input type="text" onChange={changeData} value={adminData.username} name="username" className="form-control form-control-sm" id="username"  />
                                                {errors.username && <p  style={{ color: "red" }}>{errors.username}</p>}

                                          </div>
                                          <div className="form-group">
                                                <label className="move" htmlFor="password">Password</label>
                                                <input type="password" onChange={changeData} value={adminData.password} name="password" className="form-control form-control-sm" id="password" />
                                                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                                          </div>
                                          <button type="submit" onClick={validateData} className="btn btn-primary btn-block">Login</button>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default withRouter(LoginForm)