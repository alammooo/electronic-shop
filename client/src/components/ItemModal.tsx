import InputForm from "./InputForm"

export default function ItemModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: any
}) {
  return (
    <div
      tabIndex={-1}
      className={`bg-zinc-300 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full ${
        showModal ? "fixed" : "hidden"
      }`}>
      <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Add new Item
            </h3>
            <button
              type="button"
              onClick={() => setShowModal(!showModal)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
              <span
                className="sr-only"
                onClick={() => setShowModal(!showModal)}>
                Close modal
              </span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <InputForm showModal={showModal} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </div>
  )
}
