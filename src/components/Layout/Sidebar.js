import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'
import { context } from '../../context/context';
const Sidebar = () => {
    var location = useLocation()
    const { toggleButton } = useContext(context);
    return (
        <>
            <nav id="sidebar" className={toggleButton ? 'active' : ""} >
                <div className="sidebar-header">
                    <div className="logo text-center">
                        <Link to="/dashboard"><img src="/assets/images/logo2.png" style={{ width: "60%" }} alt="logo" className="img-fluid" /></Link>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li className={location?.pathname === "/dashboard" ? "active" : "noactive"}> <Link to="/dashboard">Dashboard</Link> </li>
                    <li className={location?.pathname === "/patient-list" || location?.pathname === "/doctor-list" ? "active" : "noactive"}>
                        <a href="#user" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Users Management</a>
                        <ul className={location?.pathname === "/patient-list" || location?.pathname === "/doctor-list" ? "list-unstyled" : "list-unstyled collapse"} id="user">
                            <li className={location?.pathname === "/patient-list" ? "active" : "noactive"}> <Link to="/patient-list">All Patients</Link> </li>
                            <li className={location?.pathname === "/doctor-list" ? "active" : "noactive"}> <Link to="/doctor-list">All Doctors</Link> </li>
                        </ul>
                    </li>
                    <li className={location?.pathname === "/list-for-approval"  ? "active" : "noactive"}>
                        <a href="#reporting" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Doctor Approval</a>
                        <ul className={location?.pathname === "/list-for-approval"  ? "list-unstyled" : "collapse list-unstyled"} id="reporting">
                            <li className={location?.pathname === "/list-for-approval" ? "active" : "noactive"}> <Link to="/list-for-approval">Doctors List</Link> </li>
                        </ul>
                    </li>
                    {/* <li className={location?.pathname === "/Reported-Posts"  ? "active" : "noactive"}>
                        <a href="#postReports" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Report Management</a>
                        <ul className={location?.pathname === "/Reported-Posts"  ? "list-unstyled" : "collapse list-unstyled"} id="postReports">
                            <li className={location?.pathname === "/Reported-Posts" ? "active" : "noactive"}> <Link to="/Reported-Posts">Reported Posts</Link> </li>
                        </ul>
                    </li> */}
                    {/* <li className={location?.pathname === "/add-category" ? "active" : "noactive"}>
                        <a href="#coupon" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Category Management</a>
                        <ul className={location?.pathname === "/add-category" ? "list-unstyled" : "collapse list-unstyled"} id="coupon">
                            <li className={location?.pathname === "/add-category" ? "active" : "noactive"}> <Link to="/add-category">Add Category</Link> </li>
                        </ul>
                    </li>  */}
                    {/* <li className={location?.pathname === "/terms-and-conditions" || location?.pathname === "/privacy-policy" ? "active" : "noactive"}>
                        <a href="#content" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Content Management</a>
                        <ul className={location?.pathname === "/terms-and-conditions" || location?.pathname === "/privacy-policy" ? "list-unstyled" : "collapse list-unstyled"} id="content">
                            <li className={location?.pathname === "/terms-and-conditions" ? "active" : "noactive"}> <Link to="/terms-and-conditions">Terms & Conditions</Link> </li>
                            <li className={location?.pathname === "/privacy-policy" ? "active" : "noactive"}> <Link to="/privacy-policy">Privacy Policy</Link> </li>
                        </ul>
                    </li> */}
                </ul>
            </nav>
        </>

    )
}

export default Sidebar