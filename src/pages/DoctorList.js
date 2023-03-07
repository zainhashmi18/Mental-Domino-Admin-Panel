import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { blockUnblock, deleteAccount, getAllDoctors, getUserStatus } from '../store/slices/userSlice';
import { CSVLink } from "react-csv";
import $ from "jquery"
import 'datatables.net'
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "30%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const DoctorList = () => {
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [doctor, setDoctor] = useState(null)
    const status = useSelector(getUserStatus)
    const [doctorDetail, setDoctorDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    var csvData = [
        ["Name", "Email", "Doctor Name", "Category", "Doctor Address", "State", "Verified", "Zip Code", "Role"],
    ]
    doctor?.map((item) =>
        csvData.push([`${item?.name}`, `${item?.email}`, `${item?.businessName}`, `${item?.category}`, `${item?.businessAddress}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
    )
    function viewModal(item, type) {
        setIsOpen(true);
        if (type == "doctorDetail") {
            setDoctorDetail(item)
        } else if (type == "delete") {
            setId(item)
        } else if (type == "academicInfo") {
            setDoctorDetail(item)
        }
        else if (type == "professionalExperience") {
            setDoctorDetail(item)
        }
        else if (type == "certificates") {
            setDoctorDetail(item)
        }
        setModalType(type)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const accountDelete = async (id) => {
        try {
            await dispatch(deleteAccount(id)).unwrap()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try {
                Doctor()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const blockUnblockAccount = async (id) => {
        try {
            await dispatch(blockUnblock(id)).unwrap()
            $('#tableData')
                .DataTable().destroy();
            try {
                Doctor()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const Doctor = async () => {
        try {
            setDoctor(null)
            const response = await dispatch(getAllDoctors()).unwrap()
            setDoctor(response?.data)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    useEffect(() => {
        let mount = true
        if (mount) {
            Doctor();
        }
        return () => {
            mount = false
        }
    }, [])

    useEffect(() => {
        if (doctor) {
            $('#tableData')
                .DataTable({
                    lengthMenu: [10, 25, 50, 100, 200],
                    language: {
                        "emptyTable": "Doctor Not Found"
                    },
                    destroy: true,
                });
        }
    }, [doctor])
    return (
        <>
            <Modal
                closeTimeoutMS={500}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Change Password"
            >
                <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block", zIndex: 100 }}>
                    {modalType == "doctorDetail" ? <>
                        <p className="pass-text">Doctor Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Address:</b> {doctorDetail?.address}</p>
                            <p > <b>City:</b> {doctorDetail?.city}</p>
                            <p > <b>Country:</b> {doctorDetail?.country}</p>
                            <p > <b>Zip:</b> {doctorDetail?.zip_code}</p>
                            <p > <b>State:</b> {doctorDetail?.state}</p>
                            <p > <b>Bio:</b> {doctorDetail?.bio}</p>
                            <p > <b>Charges:</b> {doctorDetail?.charges}</p>

                        </div>
                    </> : modalType == "academicInfo" ? <>
                        <p className="pass-text">Academic Information</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Course:</b> {doctorDetail?.course}</p>
                            <p > <b>College Name:</b> {doctorDetail?.college_name}</p>
                            <p > <b>Year:</b> {doctorDetail?.year}</p>

                        </div>
                    </> : modalType == "professionalExperience" ? <>
                        <p className="pass-text">Professional Experience</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Clinic name:</b> {doctorDetail?.clinic_name}</p>
                            <p > <b>Clinic Experience:</b> {doctorDetail?.clinic_experience}</p>
                            <p > <b>Clinic Address:</b> {doctorDetail?.clinic_address}</p>
                            <p > <b>Specialities:</b> {doctorDetail?.specialities}</p>

                        </div>
                    </> : modalType == "certificates" ? <>
                        <p className="pass-text">Certificates</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <div className='d-flex justify-content-center'>
                                {doctorDetail?.length > 0
                                    ?
                                    doctorDetail?.map((item, i) => (
                                        <img key={i} height="20%" width="20%" className='m-2' style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${item}`}></img>
                                    ))
                                    : <p>No Certificates Found</p>}
                            </div>
                        </div>
                    </> : modalType == "delete" ? <>
                        <p className="pass-text">Delete Account Confirmation</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </> : <></>}
                </div>
            </Modal>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: doctor ? "3%" : "12%"
            }}>
                <section className="excel-sec">
                    <div className="container">
                        <div className="  mt-2 mb-3">
                            {/* {doctor ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"Doctor List.csv"} data={csvData}>Export Excel</CSVLink>
                                </button>
                                : <>
                                </>} */}
                        </div>
                    </div>
                </section>
                <section className="coupon-sec-2">
                    <div className="container tableContainer">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive" id="tableready">
                                            <table id="tableData" className="table  table-bordered" style={{ width: '100%', textAlign: "center" }}>
                                                <thead>
                                                    {doctor ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Medical License No</th>
                                                        <th>Academic Information</th>
                                                        <th>Professional Experience</th>
                                                        <th>Certificates</th>
                                                        <th>Details</th>
                                                        <th>Status</th> 
                                                        {/* <th>Action</th> */}
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {doctor?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.user_name}</td>
                                                            <td>{item?.email}</td>
                                                            <td>{item?.phone_number}</td>
                                                            <td>{item?.medical_license_number}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?.academic_info, "academicInfo")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?.professional_experience, "professionalExperience")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?.certificates, "certificates")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "doctorDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td><b style={{ padding: 3, borderRadius: 5, color: item?.is_verified == 1 ? "#fff" : item?.is_verified == 0 ? "#000" : "#fff", backgroundColor: item?.is_verified == 1 ? "limegreen" : item?.is_verified == 0 ? "yellow" : "red" }}>{item?.is_verified ==1 ?"Approved":"Pending"}</b></td> 
                                                            {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span>
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.block ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
                                                                </span>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    {doctor ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Medical License No</th>
                                                        <th>Academic Information</th>
                                                        <th>Professional Experience</th>
                                                        <th>Certificates</th>
                                                        <th>Details</th>
                                                        <th>Status</th> 
                                                        {/* <th>Action</th> */}
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Doctor Found"}</th></tr>)}
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DoctorList