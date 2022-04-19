import React from 'react'

export const Footer = () => {
  let footerStyle = { //for now we are not using this style as style={footerStyle} in footer tag
    position: "relative", //better we give minm height to that container that has Todo
    top: "100vh",
    width: "100%"
  }
  return (
      <footer className='bg-dark text-light py-3'>
        <p className="text-center">
          Copyright &copy; MyTodosList.com
        </p>
      </footer>
  )
}
