import React from "react";
import AuthenticatedUser from "../../authentication/User";
import { useEffect, useState } from "react";
import { TrackedPlatform } from "../../helpers/trackedPlatforms";

export default function Dashboard({ userData }) {
    const [platforms, setPlatforms] = useState([])

    function clearStorage() {
        chrome.storage.local.remove(['user'], function() {
            window.location.reload();
        });
    }

    useEffect(() => {
            const fetchData = async () => {
              const trackedPlatform = new TrackedPlatform();
              try {
                const response = await trackedPlatform.get();
                setPlatforms(response.platforms) // Do something with the response data
              } catch (error) {
                console.log(error);
              }
            };
        
            fetchData();
    }, [])


    return (
        <>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto text-center sm:w-full sm:max-w-md">
                {/* <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome {userData.getUser().email}</h2>
                <p className="text-sm font-medium text-gray-600">{userData.getUser().company}</p>
            </div>
                
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                        <div className="sm:flex sm:space-x-5">
                            <div className="mt-2 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm mb-2 font-bold text-gray-600">We are currently tracking these platforms,</p>
                                

                                <ul role="list" className="divide-y divide-gray-100">
                                {platforms.map((platform) => (
                                    <li key={platform.id} className="flex gap-x-4 py-5">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={platform.icon_url} alt="" />
                                    <div className="min-w-0 text-left">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{platform.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{platform.base_url}</p>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                                
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