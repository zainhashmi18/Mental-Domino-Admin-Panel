import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { approveDisapproveReport, getReportedPosts, getUserStatus } from '../store/slices/userSlice';
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
const ReportedPosts = () => {
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [reports, setReports] = useState(null)
    const status = useSelector(getUserStatus)
    const [reportDetail, setReportDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()

    function viewModal(item, type) {
        setIsOpen(true);
        if (type == "gallery") {
            setReportDetail(item?.postId?.gallery)
        } else if (type == "reportedBy") {
            setReportDetail(item)
        } else {
            setId(item)
        }
        setModalType(type)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const changeReportStatus = async (id, status) => {
        try {
            await dispatch(approveDisapproveReport({ id, status })).unwrap()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try {
                getReports()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const getReports = async () => {
        try {
            setReports(null)
            const response = await dispatch(getReportedPosts()).unwrap()
            setReports(response?.report)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    useEffect(() => {
        let mount = true
        if (mount) {
            getReports();
        }
        return () => {
            mount = false
        }
    }, [])

    useEffect(() => {
        if (reports) {
            $('#tableData')
                .DataTable({
                    lengthMenu: [10, 25, 50, 100, 200],
                    language: {
                        "emptyTable": "Reports Not Found"
                    },
                    destroy: true,
                });
        }
    }, [reports,dispatch])
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
                    {modalType == "gallery" ? <>
                        <p className="pass-text">Post Gallery</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body" style={{ display: "flex", justifyContent: "center" }}>
                            {reportDetail?.map((item, i) => (
                                <img key={i} height="20%" width="20%" style={{ borderRadius: 5, margin: 3 }} src={`${process.env.REACT_APP_APIURL}${item[i]}`} />
                            ))}
                        </div>
                    </> : modalType == "reportedBy" ? <>
                        <p className="pass-text">Reported By</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body" >
                            {reportDetail?.map((item, i) => (
                                <>
                                    <p > <b>User:</b> {item?.name}</p>
                                </>
                            ))}
                        </div>
                    </> : modalType == "Approved" || modalType == "Disapproved" ? <>
                        <p className="pass-text">{modalType == "Approved" ? "Approval Confirmation" : modalType == "Disapproved" ? "Disapproval Confirmation" : ""}</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => changeReportStatus(id, modalType)} className="cta-btn col-reds w-100">{modalType == "Approved" ? "Approved" : modalType == "Disapproved" ? "Disapproved" : ""}</button>
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
                marginTop: reports ? "10%" : "12%"
            }}>
                <section className="coupon-sec-2">
                    <div className="container tableContainer">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive" id="tableready">
                                            <table id="tableData" className="table table-bordered" style={{ width: '100%', textAlign: "center" }}>
                                                <thead>
                                                    {reports ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Post Text</th>
                                                        <th>Post Gallery</th>
                                                        <th>Creation Date</th>
                                                        <th>Report Count</th>
                                                        <th>Reported By</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {reports?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.postId?.text}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "gallery")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
                                                            <td>{item?.countData}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item?.users, "reportedBy")}  > View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?.postId?._id, "Approved")}  ><span className="fa fa-solid fa-check"></span> <span> Approve</span></span>
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?.postId?._id, "Disapproved")}  ><span className="fas fa-solid fa-xmark"></span><span> Disapprove</span> </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    {reports ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Post Text</th>
                                                        <th>Post Gallery</th>
                                                        <th>Creation Date</th>
                                                        <th>Report Count</th>
                                                        <th>Reported By</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Reports Found"}</th></tr>)}
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
export default ReportedPosts
