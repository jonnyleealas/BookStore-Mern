import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateBook from './pages/CreateBooks'
import UpdateBook from './pages/UpdateBook'
import DeleteBook from './pages/DeleteBook'
import GetBook from './pages/GetBook'
import Home from './pages/Home'



export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<GetBook />} />
      <Route path='/books/edit/:id' element={<UpdateBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App