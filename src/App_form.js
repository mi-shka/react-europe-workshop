import React, { useEffect, useReducer } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

// https://github.com/dabit3/amplify-auth-demo

const state = {
  username: '', password: '', email: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'SETFORM':
      return {...state, [action.formType]: action.formInput}
    
    default:
      return state
  }
}

// dispatch({ type: 'SETFORM}, formType: 'username', formInput: value })

function App() {
  const [formState, dispatch] = useReducer(reducer, state)

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user:', user)
  }

  async function signUp() {
    await Auth.signUp({
      username: formState.username, password: formState.password,
      attributes: {  email: formState.email }
    })
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App">
      <h1>Hello work</h1>
      <input placeholder='username' onChange={ e => dispatch({
        type: 'SETFORM', formType: 'username', formInput: e.target.value
      }) } />
      <input placeholder='email' onChange={ e => dispatch({
        type: 'SETFORM', formType: 'email', formInput: e.target.value
      }) } />
      <input placeholder='password' onChange={ e => dispatch({
        type: 'SETFORM', formType: 'password', formInput: e.target.value
      }) } />
    </div>
  )
}

export default withAuthenticator(App, { includeGreetings: true })

// class App extends React.Component {
//   async componentDidMount() {
//     const user = await Auth.currentAuthenticatedUser()
//     console.log('user:', user)
//   }

//   render() {
//     return (
//       // existing code
//       <div className="App">
//        <h1>Hello work</h1>
//       </div>
//     )
//   }
// }



// withAuthenticator 
// Auth -> > 30 methods, signin, signup, signout... main now - currentAuthenticatedUser


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

