// src/App.js
import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import { S3Album, withAuthenticator } from 'aws-amplify-react'

const App = () => {
    const [imageUrl, updateImage] = useState('')
    function fetchImage() {
        Storage.get('example.png')
        .then(data => {
            console.log('data:', data)
            updateImage(data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchImage()
    }, [])
    return (
        <img src={imageUrl}
        />
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