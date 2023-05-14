import React from "react";
import AuthenticatedUser from "../../authentication/User";
import { useEffect, useState } from "react";
import { TrackedPlatform } from "../../helpers/trackedPlatforms";

export default function Dashboard({ userData }) {
    const [platforms, setPlatforms] = useState()

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
                                {
                                    (platforms != null) ?
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
                                    : 
                                    <div className="my-8">
                                        <div className="flex w-full items-center justify-center">
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-100 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            Retrieving platforms...
                                        </div>
                                    </div>
                                }
                                
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