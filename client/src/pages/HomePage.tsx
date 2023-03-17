import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsGithub } from "react-icons/bs"
import ItemCard from "../components/ItemCard"
import Spinner from "../components/Spinner"
import ItemModal from "../components/ItemModal"
import toaster from "../helpers/toastOptions"
import Pagination from "../components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { fetchItem } from "../stores/actions/actionCreator"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [loading, isLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState("")
  const data = useSelector((state: any) => state.itemReducer)
  const dispatch = useDispatch()


  const nav = useNavigate()

  function handleLogout() {
    localStorage.clear()
    setIsLogin(false)
    toaster("▶️ Successfully logged out")
  }

  function handleSearch() {
    dispatch<any>(fetchItem(1, query))
  }

  useEffect(() => {
    localStorage.getItem("access_token") ? setIsLogin(true) : setIsLogin(false)
   
  }, [])
  return (
    <main className="container flex flex-col gap-3 md:gap-3 mx-auto mt-7">
      <h1 className="text-center font-black text-3xl md:text-8xl text-zinc-700">
        The.
        <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text animate-pulse-s">
          Electronic.
        </span>
        Nu.
      </h1>
      <h1 className="text-zinc-400 text-lg md:text-xl max-w-2xl text-center mx-auto">
        Providing list of top electronic Items, showcasing with interactive and
        extraodinary cards
      </h1>
      {isLogin ? (
        <button
          onClick={handleLogout}
          className="py-1.5 rounded bg-red-700 text-white font-medium text-lg w-36 mx-auto active:scale-95 duration-150">
          Logout
        </button>
      ) : (
        <button
          onClick={() => nav("/login")}
          className="py-1.5 rounded bg-red-700 text-white font-medium text-lg w-36 mx-auto active:scale-95 duration-150">
          Login
        </button>
      )}

      <div className="flex flex-col mx-auto gap-3 mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="px-32 py-1 rounded-sm bg-zinc-700 text-white font-medium text-lg active:scale-95 duration-150">
          Add Item
        </button>

        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
            className="h-9"
          />
          <button
            onClick={handleSearch}
            className="text-md px-11 rounded bg-blue-600 text-white">
            Search Item
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 mx-auto gap-7">
          <ItemCard />
        </div>
      )}

      <Pagination />

      <a
        href="https://github.com/alammooo/repositories-list"
        target="_blank"
        className="fixed inset-3 inline w-8 h-8">
        <BsGithub className="w-full h-full hover:fill-sky-500 duration-200" />
      </a>

      <ItemModal showModal={showModal} setShowModal={setShowModal} />
    </main>
  )
}
