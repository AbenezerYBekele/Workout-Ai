//// context/AuthContext.js
//import React, { createContext, useContext, useEffect, useState } from 'react';
//import { onAuthStateChanged } from 'firebase/auth';
//import { auth } from '../config/firebase';
//
//const AuthContext = createContext({});
//
//export const AuthProvider = ({ children }) => {
//  const [user, setUser] = useState(null);
//  const [loading, setLoading] = useState(true);
//
//  useEffect(() => {
//    // Listens to Firebase Auth state changes (Log in, Log out, Auto-login on app reopen)
//    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//      setUser(currentUser);
//      setLoading(false);
//    });
//
//    return () => unsubscribe();
//  }, []);
//
//  return (
//    <AuthContext.Provider value={{ user, loading }}>
//      {children}
//    </AuthContext.Provider>
//  );
//};
//
//export const useAuth = () => useContext(AuthContext);
// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Listens to Firebase Auth state changes (Log in, Log out, Auto-login on app reopen)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);