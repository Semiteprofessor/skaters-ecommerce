'use client'

import { Category } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { cn } from '@/lib/utils'

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
}

const Filter: React.FC<FilterProps> = ({ categories, className, ...props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category')

  const changeCategory = (categorySlug: string) => {
    setIsOpen(false)

    if (categorySlug === selectedCategory) {
      return window.location.assign('/products')
    }

    window.location.assign(`/products?category=${categorySlug}`)
  }
