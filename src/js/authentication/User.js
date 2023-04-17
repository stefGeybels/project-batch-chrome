import React from "react";

export class User{
    constructor() {
        this.email = "";
        this.company = "";
        this.token = "";
    }

    addEmail(newEmail) {
        this.email = newEmail;
    }

    addCompany(newCompany) {
        this.company = newCompany;
    }

    addToken(newToken) {
        this.token = newToken;
    }

    setUserFromStorage(user) {
        this.email = user.email;
        this.company = user.company;
        this.token = user.token;
    }

    isAuthenticated() {
        if (this.token === "") {
            return false;
        }

        return true
    }

    getToken(){
        return this.token;
    }

    getUser() {
        return {
            email: this.email,
            company: this.company,
            token: this.token
        }
    }
}