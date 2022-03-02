import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './Navbar.css'
function NavBar(props) {
       
      useEffect(() => {
            let role = localStorage.getItem("role");
            if (role === "ROLE_SUPERADMIN") {
                  props.setisUser(false);
                  props.history.push("/superadmin")
            } else if (role === "ROLE_ADMIN") {
                  props.setisUser(false);
                  props.history.push("/admin")
            }
           

      }, [props.isUser])

      let getSearchCarsInfo = async (event) => {
            event.preventDefault();
            let search = document.getElementById("search")
            let searchData = search.value;

            try {
                  let res = await axios.get("http://localhost:8085/user/car/search",{ params: { searchData: searchData } })
                  if (!res.data.error) {
                        props.setsearchCarInfo(res.data.searchCarDetails)
                        props.history.push("/search")
                  } else {
                        props.setsearchError(true)
                        props.setsearchCarInfo([])
                        props.history.push("/search")
                  }
            } catch (error) {
                  alert("server problem please try later")
                  console.log(error)
            }

      }

      return (
            <div className="navbar1">
                  <nav className="navbar navbar-expand-lg navbar-light bg-info bg-gradient">
                        <Link className="navbar-brand" to="/">Car Wala</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                              <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: "100px" }}>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                              </ul>
                              <form onSubmit={getSearchCarsInfo} style={{ position: "relative", top: "-8px" }} className="d-flex">
                                    <input placeholder="Type to Search" className="form-control mr-2" type="search" name="search" id="search" placeholder="Search" aria-label="Search" />
                                    <button onClick={(event) => { getSearchCarsInfo(event) }} style={{ position: "relative", top: "-19px" }} className="btn btn-outline-success" type="submit">Search</button>
                              </form>
                        </div>
                  </nav>
            </div>
      )
}

export default withRouter(NavBar)


