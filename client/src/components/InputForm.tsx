import { useState, useRef, ChangeEvent, FormEvent } from "react"
import { useAppDispatch } from "../app/hooks"
import toaster from "../helpers/toastOptions"
import Spinner from "./Spinner"
import { createItem, fetchItem } from "../stores/actions/actionCreator"

export default function InputForm({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: any
}) {
  const [name, setName] = useState("")
  const [buyPrice, setBuyPrice] = useState<number | string>("")
  const [sellPrice, setSellPrice] = useState<number | string>("")
  const [stock, setStock] = useState<number | string>("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const imageRef: any = useRef(null)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setImage(e.target.files ? e?.target.files[0] : null)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      setLoading(true)
      e.preventDefault()
      const payload = {
        name,
        buyPrice,
        sellPrice,
        stock,
        image,
      }

      await dispatch(createItem(payload))
      await dispatch<any>(fetchItem(1))

      setShowModal(false)
      setName("")
      setBuyPrice("")
      setSellPrice("")
      setStock("")
      if (imageRef.current) {
        imageRef.current.value = ""
      }
    } catch (error: any) {
      toaster("⛔ " + error.message)
    }
    setLoading(false)

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            type="number"
            value={buyPrice}
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
          ref={imageRef}
          onChange={handleFileChange}
          name="image"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help">
          PNG, JPG or JPEG (MAX. 100KB).
        </p>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        {loading ? <Spinner /> : "Add new Item"}
      </button>
    </form>
  )
}
