import React, { createContext, useContext, useEffect, useState } from 'react';
import getAssignments from './methods/getAssignments'
import postRoute from './postRoutes';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const assignMentTitle=[
  { headerText: 'Subject',
    width: '100',
    textAlign: 'Center' },
 
  { field: 'Title',
    headerText: 'Title',
    width: '150',
    textAlign: 'Center',
  },
  { field:'url',
    headerText: 'Url',
    width: '200',
    textAlign: 'Center',
    },

  { field: 'submissionDate',
    headerText: 'Submission Date',
    width: '135',
    format: 'yMd',
    textAlign: 'Center' },

  { field: 'completedStatus',
    headerText: 'Completed Status',
    width: '120',
    textAlign: 'Center' },
  
];

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [showAddMenu, setShowAddMenu]=useState(false);
  const [assignments,setAssignments]=useState([]);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  useEffect(()=>{
    const assignments=getAssignments()
    console.log(assignments)
  },[])
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings,showAddMenu,setShowAddMenu,assignments,postRoute,assignMentTitle }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);