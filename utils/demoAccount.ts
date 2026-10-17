import demoAccount from '@/data/demo-account.json'

const protectedDemoEmails = [demoAccount.email, 'enjoy-demo-20261015@example.com']
export const isDemoAccount = (email: unknown) =>
  typeof email === 'string' && protectedDemoEmails.includes(email.trim().toLowerCase())
