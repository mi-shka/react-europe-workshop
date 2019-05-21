// src/App.js
import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import { S3Album, withAuthenticator } from 'aws-amplify-react'

class S3ImageUpload extends React.Component {
  onChange(e) {
      const file = e.target.files[0];
      Storage.put('example.png', file, {
          contentType: 'image/png'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
  }

  render() {
      return (
          <input
              type="file" accept='image'
              onChange={(e) => this.onChange(e)}
          />
      )
    }
  }

export default withAuthenticator(S3ImageUpload, { includeGreetings: true })