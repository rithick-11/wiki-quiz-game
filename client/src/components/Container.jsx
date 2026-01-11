import React from 'react'

const Container = ({children, className}) => {
  return (
    <section className={`px-3 sm:px-12 md:px-32 ${className}`}>{children}</section>
  )
}

export default Container