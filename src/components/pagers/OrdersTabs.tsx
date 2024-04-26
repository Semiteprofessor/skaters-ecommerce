'use client'

import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useRouter, useSearchParams } from 'next/navigation'

import { Separator } from '@/components/ui/Separator'
import { cn } from '@/lib/utils'

export function OrderTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get('status')

  const tabs = [
    {
      title: 'All',
      href: `/dashboard/orders`,
      isActive: status === null,
    },
    {
      title: 'Pending',
      href: `/dashboard/orders?status=PENDING`,
      isActive: status === 'PENDING',
    },
    {
      title: 'Paid',
      href: `/dashboard/orders?status=PAID`,
      isActive: status === 'PAID',
    },
    {
      title: 'Canceled',
      href: `/dashboard/orders?status=CANCELED`,
      isActive: status === 'CANCELED',
    },
  ]
