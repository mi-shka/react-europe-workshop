// src/App.js
import React, { useEffect, useState } from 'react'
import { Analytics, Auth } from 'aws-amplify'
import { S3Album, withAuthenticator } from 'aws-amplify-react'

const state = {username: ''}

const App = () => {
    const [username, setUsername] = useState('')
    function recordEvent() {
        Analytics.record({
            name: 'My test event',
            attributes: { username }
        })
    }
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(user => setUsername(user.username))
        .catch(err => console.log(err))
    }, [])
    return (
        <button onClick={recordEvent}>Record Event</button>
    )
}

// class S3ImageUpload extends React.Component {
//     onChange(e) {
//         const file = e.target.files[0];
//         Storage.put('example.png', file, {
//             contentType: 'image/png'
//         })
//         .then (result => console.log(result))
//         .catch(err => console.log(err));
//     }
  
//     render() {
//         return (
//             <input
//                 type="file" accept='image'
//                 onChange={(e) => this.onChange(e)}
//             />
//         )
//     }
//   }

export default withAuthenticator(App, { includeGreetings: true })