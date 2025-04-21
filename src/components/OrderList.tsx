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

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ['infinite-query'],
      queryFn: async ({ pageParam }) => {
        const { data } = await axios.get(
          `/api/orders?limit=${ORDER_INFINITE_SCROLL_LIMIT}&page=${pageParam}&status=${status}`,
        )
        return data as Order[]
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1
      },
      initialData: { pages: [initialOrders], pageParams: [1] },
    },
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  useEffect(() => {
    refetch()
  }, [status, refetch])

  const orders = data?.pages.flatMap((page) => page) ?? initialOrders
