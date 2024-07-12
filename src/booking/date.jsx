import React from 'react'

const cardStyle = {
    width: '65rem',
    borderRadius: '1rem',
    boxShadow: '0px 15px 20px #999',
    display: 'flex',
    flexDirection: 'column',
    margin: '0.2rem 0',
    backgroundColor: 'white',
    padding: '1rem',
    height: 'auto'
  };
  
  const headerStyle = {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontFamily: 'var(--mantine-font-family)',
    backgroundColor: 'hsl(var(--muted)/0.5)',
    padding: '1.5rem',
    color: 'black',
    margin: '0'
  };
  

function date() {
  return (
   <div style={cardStyle}>
      <h1 style={headerStyle}>Card Title</h1>
      <p>Card content goes here.</p>
    </div>
  )
}

export default date
