import React, { useContext } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../../pages/Login';
import { useSelector } from 'react-redux'
import { getUserStatus, getUserToken } from "../../store/slices/userSlice"
import Dashboard from '../../pages/Dashboard';
import PatientList from '../../pages/PatientList';
import DoctorList from '../../pages/DoctorList';
import TermsAndConditions from '../../pages/TermsAndConditions';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import Spinner from '../Spinner';
import AddCategory from '../../pages/AddCategory';
import { context } from '../../context/context';
import ListForApproval from '../../pages/ListForApproval';
import ReportedPosts from '../../pages/ReportedPosts';


const Layout = () => {
    const { isLoading } = useContext(context);
    const status = useSelector(getUserStatus)
    const authToken = useSelector(getUserToken)
    return (
        <>
            {status == 'loading' || isLoading ? <Spinner /> : <></>}
            <div className={!authToken ? "" : "wrapper"}> 
                <BrowserRouter>
                    {authToken ? <>
                        <Sidebar />
                        <div style={{ width: "100%" }}>
                            <Nav />
                            <Routes>
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" exact element={<Dashboard />} />
                                <Route path="/list-for-approval" exact element={<ListForApproval />} />
                                {/* <Route path="/Reported-Posts" exact element={<ReportedPosts />} /> */}
                                <Route path="/patient-list" exact element={<PatientList />} />
                                <Route path="/doctor-list" exact element={<DoctorList />} />
                                {/* <Route path="/terms-and-conditions" exact element={<TermsAndConditions />} />
                                <Route path="/privacy-policy" exact element={<PrivacyPolicy />} /> */}
                                {/* <Route path="/add-category" exact element={<AddCategory />} /> */}
                            </Routes>
                        </div>
                    </> :
                        <>
                            <Routes>
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route path="/" exact element={<Login />} />
                            </Routes>
                        </>
                    }
                </BrowserRouter>
            </div>
        </>
    )
}

export default Layout