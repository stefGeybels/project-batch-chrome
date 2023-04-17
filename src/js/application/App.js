import React from "react";
import Dashboard from "../popup/dashboard/Dashboard";
import { useState, useEffect } from "react";
import { User } from "../authentication/User";
import Login from "../popup/login/Login";

export default function App() {
    const [user, setUser] = useState(new User());

    useEffect(() => {
        chrome.storage.local.get(['user'], function(data) {
            if (data.user) {
                const newUser = new User();
                newUser.setUserFromStorage(data.user); 
                setUser(newUser);
            }
        });
    }, []);

    if (user.isAuthenticated()) {
        return <Dashboard userData={user}/>
    }

    const loginAttempt = (userData) => {
        setUser(userData);
        chrome.storage.local.set({ user: userData.getUser() });
    }

    return <Login loginAttempt={loginAttempt}/>
}