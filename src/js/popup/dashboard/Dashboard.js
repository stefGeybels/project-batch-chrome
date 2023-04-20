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
                        <div className="sm:flex sm:space-x-5">
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">We are currently collecting data for,</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{userData.getUser().email}</p>
                                <p className="text-sm font-medium text-gray-600">{userData.getUser().company}</p>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                            <button
                            href="#"
                            className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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