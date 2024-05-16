'use client'

import { Category, Product } from '@prisma/client'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import IconButton from '@/components/ui/IconButton'
import { formatPrice } from '@/lib/utils'
import useCart from '@/hooks/useCart'

interface ProductCardProps {
  product: Product & {
    Category: Category
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    cart.addItem(product)
  }
