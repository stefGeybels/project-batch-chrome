import React from "react";
import AuthenticatedUser from "../../authentication/User";

export default function Dashboard({ userData }) {

    function clearStorage() {
        chrome.storage.local.remove(['user'], function() {
            window.location.reload();
        });
    }

    return (
        <div>
            <h1>Email: {userData.getUser().email}</h1>
            <h1>Company: {userData.getUser().company}</h1>
            <h1>Token: {userData.getUser().token}</h1>
            <button onClick={() => clearStorage()}>Button</button>
        </div>
    )
}