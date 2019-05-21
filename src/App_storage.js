// src/App.js
import React from 'react'
import { Storage } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

function App() {
  function addToStorage () {
    Storage.put('javascript/MyReactComponent.js', `
      import React from 'react'
      const App = () => (
        <p>Hello World</p>
      )
      export default App
    `)
      .then (result => {
        console.log('result: ', result)
      })
      .catch(err => console.log('error: ', err));
  }

  return (
    <div>
      <button onClick={addToStorage}>Add To Storage</button>
    </div>
  )
}

export default withAuthenticator(App, { includeGreetings: true })