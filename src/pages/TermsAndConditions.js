import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTcPp, TcPp,updateTcpp } from '../store/slices/userSlice'
import moment from 'moment'
const TermsAndConditions = () => {
  const [tc, setTc] = useState('')
  const dispatch = useDispatch()
  const Tc = useSelector(getTcPp) 
  const updateTc = async () => {
    try {
      await dispatch(updateTcpp({termCondition:tc?tc:Tc?.termCondition?Tc?.termCondition:" "})).unwrap()
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
    if (mount && !Tc) {
      TcPpData();
    }
    return () => {
      mount = false
    }
  }, [])

  return (
    <>
      <section className="term-condition-sec">
        <div className="container type-2">
          <div className="term-condition-wrap">
            <div className="term-condition-box">
              <h1 className="heading">Terms and conditions</h1>
              <h1 className="heading-2">Terms &amp; Conditions</h1>
              <div className="content-box">
                <textarea className="gen-paragraph  mt-2" defaultValue={Tc?.termCondition} rows="8" cols="100" style={{ padding: 10 }} onChange={(e)=>setTc(e.target.value)}>
                </textarea>
                <p className="last-update">Last Updated: {moment(Tc?.updatedAt).format("MMM DD, YYYY")}</p>
                <div className="login-button mt-2">
                  <button onClick={() => updateTc()} className="cta-btn col-reds w-20 pt-1 pb-1">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditions