import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react"
import { toast } from "react-toastify"
import toaster from "../helpers/toastOptions"
import Spinner from "./Spinner"
import axios from "axios"
import { uri } from "../interfaces/Interfaces"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemId, updateItem } from "../stores/actions/actionCreator"

export default function EditForm({
  showModal,
  setShowModal,
  id,
}: {
  showModal: boolean
  setShowModal: any
  id: number
}) {
  const { item } = useSelector((state: any) => state.item)
  const [name, setName] = useState("")
  const [buyPrice, setBuyPrice] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setImage(e.target.files ? e?.target.files[0] : null)
  }


  useEffect(() => {
    if (item) {
      setName(item.name)
      setBuyPrice(item.buyPrice)
      setSellPrice(item.sellPrice)
      setStock(item.stock)
    }
  }, [item])

  useEffect(() => {
    if (id !== 0) {
      dispatch<any>(fetchItemId(id))
    }
  }, [dispatch, id])

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault()
      setLoading(true)
      const payload = {
        name,
        buyPrice,
        sellPrice,
        stock,
        image,
      }
      await dispatch<any>(updateItem(payload, id))
      setShowModal(false)
    } catch (error: any) {
      toaster("⛔ " + error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="itemName"
          className="block mb-2 text-sm font-medium text-gray-900">
          Item Name
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="itemName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Galaxy S10"
          required
        />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="buyPrice"
            className="block mb-2 text-sm font-medium text-gray-900">
            Buy Price
          </label>
          <input
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            value={buyPrice}
            type="number"
            id="buyPrice"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
            placeholder="50000"
            required
          />
        </div>
        <div>
          <label
            htmlFor="sellPrice"
            className="block mb-2 text-sm font-medium text-gray-900">
            Sell Price
          </label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            id="sellPrice"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
            placeholder="75000"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="stock"
          className="block mb-2 text-sm font-medium text-gray-900">
          Stock
        </label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          id="stock"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
          placeholder="20"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="file_input">
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
          id="file_input"
          onChange={handleFileChange}
          name="image"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help">
          PNG, JPG or JPEF (MAX. 100KB).
        </p>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        {loading ? <Spinner /> : "Edit Item"}
      </button>
    </form>
  )
}
