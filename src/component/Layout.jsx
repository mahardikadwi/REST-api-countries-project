// Layout.jsx
import React from 'react'
import Footer from './Footer'


const Layout = ({children}) => {
  return (
    <>
        <div className="dark:bg-slate-800 min-h-screen">
            {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout