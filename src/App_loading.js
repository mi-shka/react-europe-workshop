// src/App.js
import React, { useEffect, useState, useReducer } from 'react'
import { API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

const initialState = {
  coins: [],
  loading: true
}

function reducer(state, action) {
  switch(action.type) {
    case 'SETCOINS':
      return { coins: action.coins, loading: false} 
    case 'ERROR':
      return {...state, loading: false}
    default:
      return state
   }
}

function App() {
  // const [coins, updateCoins] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)

  async function getData() {
    try {
      // const data = await API.get('cryptoapi', '/coins')
      const data = await API.get('cryptoapi', '/coins?limit=5&start=100')
      console.log('data from Lambda REST API: ', data)
      dispatch({type: 'SETCOINS', coins: data.coins})
      // updateCoins(data.coins)
    } catch (err) {
      dispatch({type: 'ERROR'})
      console.log('error fetching data..', err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (state.loading) return <h1> Loading...</h1>

  return (
    <div>
      {
        state.coins.map((c, i) => (
          <div key={i}>
            <h2>{c.name}</h2>
            <p>{c.price_usd}</p>
          </div>
        ))
      }
    </div>
  )
}

export default withAuthenticator(App, { includeGreetings: true })