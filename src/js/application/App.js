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
                newUser.addToken(data.user);
                setUser(newUser);
            }
        });
    }, []);

    if (user.isAuthenticated()) {
        return <Dashboard />
    }

    const loginAttempt = (userData) => {
        const newUser = new User();
        newUser.addToken("sdkjfhsk");
        newUser.addEmail(userData.email);
        newUser.addCompany(userData.company);
        setUser(newUser);
        chrome.storage.local.set({ user: newUser.getUser() });
    }

    return <Login loginAttempt={loginAttempt}/>
}