'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/Separator'

interface StoreTabsProps {
  storeId: string
}

export function StoreTabs({ storeId }: StoreTabsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: 'Products',
      href: `/dashboard/stores/${storeId}`,
      isActive: segment === null,
    },
    {
      title: 'Settings',
      href: `/dashboard/stores/${storeId}/settings`,
      isActive: segment === 'settings',
    },
  ]
