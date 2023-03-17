export interface User {
  username: string
  password: string
}

export interface Data {
  id?: number
  name: string
  buyPrice: number | string
  sellPrice: number | string
  stock: number | string
  image?: string | File | null
}

export interface State {
  data: Data[]
  isLoading: boolean
  error: string | null | undefined
  status: any
}

export interface InitialState {
  items: Data[]
  item: Data
  pages: 0
}

export const uri = "http://localhost:3000"
// export const uri = "https://nutechshop-production.up.railway.app"
