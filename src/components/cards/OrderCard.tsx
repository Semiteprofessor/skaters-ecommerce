'use client'

import type { Order } from '@prisma/client'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import getOrderItems from '@/actions/get-order-items'
import { OrderAction } from '@/components/actions/OrderAction'
import OrderItemSkeleton from '@/components/skeletons/OrderItemSkeleton'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { formatPrice } from '@/lib/utils'
import { GetOrderItems } from '@/types/get-order-items'

interface OrderCardProps {
  order: Order
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [orderItems, setOrderItems] = useState<GetOrderItems[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getOrderItems(order.id)
        setOrderItems(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [order])
