import React, { createContext, useState } from 'react';

export const FeaturesContext = createContext();

export const FeaturesProvider = ({ children }) => {
  const [checkedValues, setCheckedValues] = useState(localStorage.getItem('checked') !== null ? JSON.parse(localStorage.getItem('checked')) : ['Total PPE Incidents','Helmet Non Adherence','Hand gloves Non Adherence','Apron Non-Adherence','Goggle Non Adherence','Mobile Detection','Shoes Non Adherence','Person at Robotic Cell']);

  

  return (
    <FeaturesContext.Provider value={{ checkedValues, setCheckedValues }}>
      {children}
    </FeaturesContext.Provider>
  );
};