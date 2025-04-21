'use client'

import { useIntersection } from '@mantine/hooks'
import { Order } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import OrderCard from '@/components/cards/OrderCard'
import OrderCardSkeleton from '@/components/skeletons/OrderCardSkeleton'
import { ORDER_INFINITE_SCROLL_LIMIT } from '@/config'

interface OrdersListProps {
  initialOrders: Order[]
  totalData: number
}

const OrdersList: React.FC<OrdersListProps> = ({
  initialOrders,
  totalData,
}) => {
  const lastOrderRef = useRef<HTMLElement>(null)

  const { ref, entry } = useIntersection({
    root: lastOrderRef.current,
    threshold: 1,
  })

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
