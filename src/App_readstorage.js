// src/App.js
import React, { useEffect } from 'react'
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
  function readFromStorage () {
    Storage.list('javascript/')
    .then(data => console.log('data from S3: ', data))
    .catch(err => console.log('error'))
  }
  useEffect(() => {
    Storage.list('')
      .then(data => console.log('data from S3 useEffect: ', data))
      .catch(err => console.log('error'))
  })

  return (
    <div>
      <button onClick={addToStorage}>Add To Storage</button>
      <button onClick={readFromStorage}>Read From Storage</button>
    </div>
  )
}

export default withAuthenticator(App, { includeGreetings: true })