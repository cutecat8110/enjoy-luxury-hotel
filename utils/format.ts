export function formatCurrency(amount: number) {
  return `NT$ ${amount.toLocaleString('zh-TW')}`
}
