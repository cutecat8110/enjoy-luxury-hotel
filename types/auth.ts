export type Address = {
  zipcode: number | undefined
  detail: string
}

export type SignupData = {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  address: Address
}
