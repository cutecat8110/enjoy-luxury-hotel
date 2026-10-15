import demoAccount from '@/data/demo-account.json'

export const isDemoAccount = (email: unknown) =>
  typeof email === 'string' && email.trim().toLowerCase() === demoAccount.email
