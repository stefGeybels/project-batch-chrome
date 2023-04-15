import React from "react";
import AuthenticatedUser from "../../authentication/User";

export default function Dashboard() {
    return (
        <div>
            <h1>{AuthenticatedUser.getUser().email}</h1>
        </div>
    )
}