import React from 'react'
import Modal from 'react-modal'
import SignupForm from './Form'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const SignupModal = ({ modalIsOpen, setIsOpen, setLogin }) => {
  return(
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={e => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="text-center">Signup</h3>
        <SignupForm
          setIsOpen={setIsOpen}
          setLogin={setLogin}
        />
      </Modal>
    </div>
  )
}
export default SignupModal
