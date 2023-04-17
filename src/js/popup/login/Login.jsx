import React, { useState } from "react"
import { User } from "../../authentication/User"
import axios from "axios"
import data from "../../variables.json"
import ApiError from "../../errors/BadApiResponse"

export default function Login({loginAttempt}) {
    const [email, setEmail] = useState('')
    const [companySecret, setCompanySecret] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState('')

    const user = new User()

    function login(e) {
        e.prevenDefault
        setError('')
        axios.post( data.url + '/api/v1/extension-registration', {
            email: email,
            company: company,
            passphrase: companySecret
        }).then((response) => {
            user.addToken(response.data.token)
            user.addEmail(email)
            user.addCompany(response.data.company)
            loginAttempt(user)
        }).catch((exception) => {
          setError(exception.response.data.message)
        })
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
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Connect your plugin to your company</h2>
          </div>

          {
            (error !== '') ?  <ApiError message={error} />
              : <div></div>
          }
            
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Company name
                  </label>
                  <div className="mt-2">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Company code
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={companySecret}
                      onChange={e => setCompanySecret(e.target.value)}
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Don't know your company code?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => login(e)}
                  >
                    Register
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
  