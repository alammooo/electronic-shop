import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { fetchItem } from "../stores/actions/actionCreator"

export default function Pagination() {
  const pages = useSelector((state: any) => state.pages)
  const items = useSelector((state: any) => state.items)
  const [pageNumber, setPageNumber] = useState<number[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    if (items) {
      setPageNumber(Array.from({ length: pages }, (_, i) => i + 1))
    }
  }, [items, pages])
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-7">
      <div className="flex flex-1 justify-between sm:hidden">
        <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </a>
        <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumber.map((page) => (
              <a
                key={page}
                onClick={() => {
                  dispatch<any>(fetchItem(page))
                }}
                aria-current="page"
                className="relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                {page}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
