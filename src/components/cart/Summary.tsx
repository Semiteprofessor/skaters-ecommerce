'use client'

import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

const Summary = () => {
  const [token, setToken] = useState<string>('')
  const session = useSession()
  const router = useRouter()
  const cart = useCart()

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const { mutate: onCheckout, isPending } = useMutation({
    mutationFn: async () => {
      if (!session.data?.user) {
        return router.push('/sign-in')
      }

      const productIds = cart.items.map((item) => item.id)
      const { data } = await axios.post('/api/payments/charge', { productIds })

      return data
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      }
    },
    onSuccess(data) {
      setToken(data.token)
      cart.removeAll()
    },
  })
