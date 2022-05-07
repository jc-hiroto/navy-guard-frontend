import { useState } from 'react'
import './App.css'
import HomePageContainer from './containers/HomePageContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HomePageContainer />
    </div>
  )
}

export default App
