import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import prisma from '@/lib/db'

interface CategoryCardProps {
  category: Category
}

const CategoryCard: React.FC<CategoryCardProps> = async ({ category }) => {
  const products = await prisma.product.count({
    where: {
      categoryId: category.slug,
    },
  })
