import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ErrorPage from "./pages/ErrorPage"
import store from "./stores"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
)
