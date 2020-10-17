import React from 'react'
import Modal from 'react-modal'
import LoginForm from './Form'


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


const LoginModal = ({ modalIsOpen, setIsOpen, setSignup }) => {
  return(
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={e => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="text-center">Login</h3>
        <LoginForm
          setIsOpen={setIsOpen}
          setSignup={setSignup}
        />
      </Modal>
    </div>
  )
}
export default LoginModal
