import React from "react";
import { useState } from "react";

export default function AuthenticatedUser() {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [token, setToken] = useState("");

    function addEmail(newEmail) {
        setEmail(newEmail);
    }

    function addCompany(newCompany) {
        setCompany(newCompany);
    }

    function addToken(newToken) {
        setToken(newToken);
    }

    function isAuthenticated() {
        if (token === "") {
            return false;
        }

        return true
    }

    function getToken(){
        return token;
    }

    function getUser() {
        return {
            email: email,
            company: company,
            token: token
        }
    }
}