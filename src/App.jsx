import React, { useContext } from 'react'
import LogIn from './logIn/LogIn'
import Register from './register/Register'
import Category from './category/Category'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './notFound'
import Detail from './detail/Detail'
import Cart from './cart/Cart'
import Context from './ContextWrapper'
import ProtectedRoute from './protectedRoute/ProtectedRoute'

const App = () => {
  const { auth } = useContext(Context);

  return (
    <>
      <Routes>
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/detail' element={
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        } />
        <Route path='/category' element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        } />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<LogIn />} />
        <Route path='/' element={auth ? <Navigate to='/category' replace /> : <Navigate to='/login' replace />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App