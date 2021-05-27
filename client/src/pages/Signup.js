import React from 'react'
import SignupForm from '../components/signup/Form'

const Signup = (props) => {
    return(
        <div className="admin-login">
            <div className="row mx-0 justify-content-center align-items-center" style={{height: '100vh'}}>
              <div className="col-10 col-sm-8 col-md-6 col-lg-5 shadow p-4" style={{minHeight: '200px'}}>
                <h3 className="text-center">Sign Up</h3>

                <SignupForm />

              </div>
            </div>
        </div>
    )
}

export default Signup