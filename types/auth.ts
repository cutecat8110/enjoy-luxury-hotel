export type Address = {
  zipcode: number | undefined
  detail: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  address: Address
}

export type loginPayload = {
  email: string
  password: string
}
