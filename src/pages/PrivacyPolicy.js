import React,{useEffect,useState} from 'react'
 import { useDispatch,useSelector } from 'react-redux'
import { getTcPp, TcPp,updateTcpp } from '../store/slices/userSlice'
import moment from 'moment'
const PrivacyPolicy = () => {
   const [pp, setPp] = useState('')
  const dispatch=useDispatch()
  const Pp=useSelector(getTcPp)  
  const updatePp = async () => {
    try {
      await dispatch(updateTcpp({privacyPolicy:pp?pp:Pp?.privacyPolicy?Pp?.privacyPolicy:" "})).unwrap()
      try {
        await dispatch(TcPp()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  useEffect(() => {
    async function TcPpData() {
      try {
        await dispatch(TcPp()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    let mount = true
    if (mount && !Pp) {
      TcPpData();
    }
    return () => {
      mount = false
    }
  }, [])
  return (
    <> 
       <section className="privacy-policy-sec">
        <div className="container type-2">
          <div className="privacy-policy-wrap">
            <div className="term-condition-box">
              <h1 className="heading">Privacy Policy</h1>
              <div className="content-box">
                <textarea className="gen-paragraph  mt-2" defaultValue={Pp?.privacyPolicy} rows="8" cols="100" style={{ padding: 10 }} onChange={(e)=>setPp(e.target.value)}>
                </textarea>
                <p className="last-update">Last Updated: {moment(Pp?.updatedAt).format("MMM DD, YYYY")}</p>
                <div className="login-button mt-2">
                  <button onClick={() => updatePp()} className="cta-btn col-reds w-20 pt-1 pb-1">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy