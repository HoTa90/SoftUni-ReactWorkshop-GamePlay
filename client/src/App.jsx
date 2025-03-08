import { Routes, Route } from 'react-router'

import Navigation from './components/Navigation.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Create from './components/Games/Create.jsx'
import Details from './components/Games/Details.jsx'
import Edit from './components/Games/Edit.jsx'
import Games from './components/Games/Games.jsx'

function App() {

  return (
    <div id="box">

      <Navigation />

      {/* <!-- Main Content --> */}
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create />} />
          <Route path='/games/details/:id' element={<Details />} />
          <Route path='/games/edit/:id' element={<Edit />} />
          <Route path='/games' element={<Games />} />

        </Routes>
      </main>
      {/* <!-- Login Page ( Only for Guest users ) --> */}
      {/* <!-- Register Page ( Only for Guest users ) --> */}
      {/* <!-- Create Page ( Only for logged-in users ) --> */}
      {/* <!-- Edit Page ( Only for the creator )--> */}
      {/* <!--Details Page--> */}
      {/* <!-- Catalogue --> */}
    </div>
  )
}

export default App
