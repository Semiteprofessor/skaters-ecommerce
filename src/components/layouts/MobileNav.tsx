'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Icons } from '@/components/Icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
