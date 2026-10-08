// Shared ownership prevents one closed modal from unlocking another open modal.
const openModals = new Set<symbol>()
let originalOverflow = ''
export function lockModal(id: symbol) {
  if (openModals.has(id)) return
  if (!openModals.size) originalOverflow = document.body.style.overflow
  openModals.add(id)
  document.body.style.overflow = 'hidden'
}
export function unlockModal(id: symbol) {
  if (openModals.delete(id) && !openModals.size) document.body.style.overflow = originalOverflow
}
export const isTopModal = (id: symbol) => [...openModals].at(-1) === id
