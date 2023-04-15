import React from "react";
import Dashboard from "../popup/dashboard/Dashboard";
import { useState } from "react";
import { User } from "../authentication/User";
import Login from "../popup/login/Login";

export default function App() {
    const [user, setUser] = useState(new User());
    
    if (user.isAuthenticated()) {
        return <Dashboard />
    }

    return <Login />
}