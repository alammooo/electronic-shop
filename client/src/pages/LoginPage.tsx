import { FormEvent, useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from "../app/hooks"
import toaster from "../helpers/toastOptions"
import { User } from "../interfaces/Interfaces"
import { loginUser } from "../stores/actions/actionCreator"
import { useSelector } from "react-redux"

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const logins = useSelector((state: any) => state.logins)
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (logins) {
      toaster(logins)
    }
  }, [logins])
  const [msg, setMsg] = useState("")
  function handleLogin(e: React.FormEvent<HTMLFormElement>, payload: User) {
    e.preventDefault()
    setLoading(true)
    dispatch<any>(loginUser(payload))
      .then(() => {
        localStorage.getItem("access_token") ? nav("/") : ""
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setMsg("")
    const { name, value } = e.currentTarget
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <NavLink
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img
              className="w-48 mr-2"
              src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png"
              alt="logo"
            />
          </NavLink>
          <div className="w-full bg-white rounded shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleLogin(e, payload)}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Username (UserTry)
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Password (12345)
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center active:scale-95 duration-150">
                  {loading ? "Loading..." : "Sign in"}
                </button>
                {msg ? <h1 className="text-red-400 font-medium">{msg}</h1> : ""}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
