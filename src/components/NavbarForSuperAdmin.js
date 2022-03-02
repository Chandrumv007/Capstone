import React from 'react'
import { Link ,withRouter} from 'react-router-dom'
import "./Navbar.css"

function NavbarForSuperAdmin(props) {
      let logout=()=>{
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("role")
            props.setisUser(true)
            alert("Loggedout successfully")
      }
      return (
            <div className="navbar1">
                  <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                        <Link  style={{ color:"white" ,fontWeight:"bold"}} className="navbar-brand" to="/superadmin">Super Admin</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                              <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: "100px" }}>
                                    <li className="nav-item active">
                                          <Link className="nav-link" to="/superadmin"><span className="sr-only">(current)</span></Link>
                                    </li>

                              </ul>
                              <ul className="d-flex">
                                    <li className="nav-item navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll">
                                          <Link style={{ color:"white",fontWeight:"bold" }} onClick={() => { logout() }} className="nav-link" to="/">Logout</Link>
                                    </li>
                              </ul>
                        </div>
                  </nav>
            </div>
      )
}

export default withRouter(NavbarForSuperAdmin)