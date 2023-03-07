import React, { useEffect, useState } from 'react'
import LineChart from "../utils/LineChart"
import { useDispatch, useSelector } from 'react-redux';
import AreaChart from '../utils/AreaChart';
import { dashboard, getcampaigns, getDashboard, getUserError, recentCampaigns } from '../store/slices/userSlice';
import moment from 'moment';

const Dashboard = () => {
  const dispatch = useDispatch()
   const dashboardData = useSelector(getDashboard)
   const campaigns = useSelector(getcampaigns)
  const error = useSelector(getUserError) 
  async function data() {
    try {
      await dispatch(dashboard()).unwrap()
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  async function campaignData() {
    try {
       await dispatch(recentCampaigns()).unwrap()
     } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  useEffect(() => {
    let mount = true
    if ((mount && !dashboardData) ||(mount && !campaigns)) {
      data();
      campaignData();
    } 
    return () => {
      mount = false
    }
  }, [dispatch])


  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper2">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-home" />
              </span> Dashboard
            </h3>
          </div>
          <div className="row">
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-danger card-img-holder text-white">
                <div className="card-body">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">All Users<i className="mdi mdi-account-outline mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.totalCount}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total Patient<i className="mdi mdi-store mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.userCount}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-success card-img-holder text-white">
                <div className="card-body">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total Doctors<i className="mdi mdi-autorenew mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.doctorCount}</h2>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <h4 className="card-title float-left">All Customers</h4>
                    <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right" />
                  </div>
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body ">
                  <h4 className="card-title">All Business</h4>
                  <AreaChart />
                  <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Recent Campaigns</h4>
                  <div className="table-responsive" style={{textAlign:"center"}}>
                    {campaigns?.length > 0 ? (
                      <table className="table">
                        <thead style={{ textAlign: "center" }}>
                          <tr>
                            <th> S.No </th>
                            <th> Business </th>
                            <th> Product Name </th>
                            <th> Campaign Image </th>
                            <th> Discount </th>
                            <th> Start Date</th>
                            <th> End Date</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {campaigns?.map((item, i) =>
                          (<tr key={i}>
                            <td>{i+1}</td>
                            <td>
                              {item?.businessId?.imageName ? <>
                                <img src={`${process.env.REACT_APP_APIURL}${item?.businessId?.imageName}`} className="me-2" alt="image" /> {item?.businessId?.businessName}
                              </> : <><i className="fa fa-duotone fa-user" aria-hidden="true"></i> {item?.businessId?.businessName}</>}
                            </td>
                            <td>{item?.productName}</td>
                            <td><img src={`${process.env.REACT_APP_APIURL}${item?.campaignImage}`} className="me-2" alt="image" /></td>
                            <td>
                              <label className="badge badge-gradient-success" style={{ width: "30%" }}>{item?.discount} %</label>
                            </td>
                            <td>{moment(item?.startDate).format("DD-MMM-YYYY")}</td>
                            <td>{moment(item?.endDate).format("DD-MMM-YYYY")}</td>
                          </tr>)
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <>{error}</>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* partial */}
      </div>
      <div></div>
    </>
  )
}

export default Dashboard