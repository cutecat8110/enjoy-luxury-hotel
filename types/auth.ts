export type Address = {
  zipcode: string
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

export type LoginPayload = {
  email: string
  password: string
}

export type ForgotPayload = {
  email: string
  code: string
  newPassword: string
}
