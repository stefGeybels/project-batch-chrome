import React from "react";
import AuthenticatedUser from "../../authentication/User";

export default function Dashboard({ userData }) {

    function clearStorage() {
        chrome.storage.local.remove(['user'], function() {
            window.location.reload();
        });
    }

    return (
        <>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome</h2>
            </div>
                
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                    <div>
                        <p className="mt-2 text-base leading-7 text-gray-600">We are currently collecting data for {userData.getUser().email}</p>
                        <p className="mt-2 text-base leading-7 text-gray-600">For the company {userData.getUser().company}</p>
                    </div>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => clearStorage()}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                </div>
            </div>
        </div>
        </>
    )
}