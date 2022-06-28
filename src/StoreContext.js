import React from 'react'
import { ACTIONS } from 'const';
import { initCard } from 'methods/gioHang';
import { initUser } from 'methods/user';
import { DataManager } from 'utils/StoreManager';

const StoreContext = React.createContext()

function storeReducer(state, action) {
  const {data, type} = action;
  switch (type) {
    case ACTIONS.ADD_GIO_HANG: { return {...state, cards: data} }
    case 'removeCard': { return {...state, cards: []} }
    case 'adduser': { return {...state, user: data} }
    case 'removeUser': { return {...state, user: null} }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}


function StoreProvider({children}) {
  const [state, dispatch] = React.useReducer(storeReducer, {
    cards: initCard(), user: initUser() 
  })
  const value = {state, dispatch};
  DataManager.setStore({...state});
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useStore() {
  const context = React.useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a StoreProvider')
  }
  return context
}

export {StoreProvider, useStore}
