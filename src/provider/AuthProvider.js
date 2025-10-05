import React, { useState } from 'react';
import { AuthMethods } from '../firebase/AuthMethods'
import Firebase from '../firebase/Firebase'
export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
  const initState = { email: '', password: '' }
  const [inputs, setInputs] = useState(initState)
  const [errors, setErrors] = useState([])
  const [token, setToken] = useState(null)


  const handleSignup = () => {
    // middle man between firebase and signup 
    // calling signup from firebase server
    AuthMethods.signup(inputs.email, inputs.password, setErrors, setToken)
  }
  const handleSignin = async () => {
    //changed to handleSingin
    // made signup signin
    await AuthMethods.signin(inputs.email, inputs.password, setErrors, setToken)
    localStorage.setItem("token", token);
  }

  const handleSignout = () => {
    Firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <firebaseAuth.Provider
      value={{
        //replaced test with handleSignup
        handleSignup,
        handleSignin,
        token,
        inputs,
        setInputs,
        errors,
        handleSignout,
      }}>
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;