import React from 'react'

const Analytics = ( { onTitleChange }) => {
  const root=window.document.getElementById('root')
  const cctv=window.document.getElementById('cctv')
 
  const shoot = () => {
    root.style.display="none";
    cctv.style.display="block";
    sessionStorage.setItem("root","none");
    sessionStorage.setItem("cctv","block");
  }
  return (
    <div>
      {onTitleChange('Analytics')}
      <button onClick={shoot}>show</button>
      analytics
    </div>
  )
}

export default Analytics
