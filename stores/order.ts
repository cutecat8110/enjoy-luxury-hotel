import type { OrderPayload } from '@/types'

import { emptyOrder, stayNights, validStay } from '@/utils/booking'

export const useOrderStore = defineStore(
  'order',
  () => {
    const order = ref<OrderPayload>(emptyOrder())

    const resetOrder = () => {
      order.value = emptyOrder()
    }

    // 是否已選擇日期
    const isConfirmedDate = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return validStay(checkInDate, checkOutDate)
    })

    const totalNights = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return isConfirmedDate.value ? stayNights(checkInDate, checkOutDate) : 0
    })

    const dateRange = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return isConfirmedDate.value ? `${checkInDate} - ${checkOutDate}` : ''
    })

    return {
      order,
      isConfirmedDate,
      resetOrder,
      totalNights,
      dateRange
    }
  },
  {
    persist: {
      storage: persistedState.sessionStorage
    }
  }
)
