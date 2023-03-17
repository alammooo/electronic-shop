import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDate } from "../helpers/dateFormat"
import { uri } from "../interfaces/Interfaces"
import { deleteItem, fetchItem } from "../stores/actions/actionCreator"
import EditModal from "./EditModal"

export default function ItemCard() {
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(0)
  const dispatch = useDispatch()
  const items = useSelector((state: any) => state.items)
  const status = useSelector((state: any) => state.status)

  useEffect(() => {
    dispatch<any>(fetchItem(1))
  }, [dispatch])

  function handleShowEditModal(id: number) {
    setShowModal(true)
    setId(id)
  }

  if (items.length === 0) {
    return (
      <div className="text-center font-medium text-xl text-red col-span-3 text-red-500">
        No Item found
      </div>
    )
  }
  return (
    <>
      {items.map((data: any, i: number) => (
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:bg-slate-50 duration-100"
          key={i}>
          <div className="">
            <img
              className="rounded-t-lg object-cover mx-auto w-96 max-h-64"
              src={
                data.img
                  ? data.img.startsWith("https")
                    ? data.img
                    : uri + "/" + data.img
                  : "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?w=1380&t=st=1678621684~exp=1678622284~hmac=fd5e93f177a235bcd61ca86e441c66d569f689e45ad699b0fc5ddfcb8e01346c"
              }
              alt={data.name}
            />
          </div>
          <div className="p-5">
            <a>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {data.name}
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xl">
                <h1 className="">Buy Price</h1>
                <h1 className="text-right">Sell Price</h1>
                <h1 className="text-green-500 font-medium">
                  {data.buyPrice?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h1>
                <h1 className="text-red-500 text-right font-medium">
                  {data.sellPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h1>
              </div>
              <h1 className="text-center text-lg">Stock</h1>
              <h1 className="text-center text-lg font-medium">{data.stock}</h1>
              <div className="flex justify-between">
                <span className="font-normal">Updated Data : </span>
                <h1 className="mb-5 font-bold">{formatDate(data.createdAt)}</h1>
              </div>
            </a>
            <div className="flex justify-between">
              <a
                onClick={() => handleShowEditModal(data.id)}
                className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 active:scale-95 duration-150">
                Edit item
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </a>
              <a
                onClick={() => {
                  dispatch<any>(deleteItem(data.id)).then(() => {
                    dispatch<any>(fetchItem(1))
                  })
                }}
                className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-900 rounded-sm hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-red-300 active:scale-95 duration-150">
                Delete Item
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
      <EditModal showModal={showModal} setShowModal={setShowModal} id={id} />
    </>
  )
}
