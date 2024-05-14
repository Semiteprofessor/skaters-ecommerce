'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { storePayload, storeSchema } from '@/lib/validators/store'
import { AlertModal } from '@/components/modals/AlertModal'

interface UpdateStoreFormProps {
  store: Store
}

export const UpdateStoreForm: React.FC<UpdateStoreFormProps> = ({ store }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<storePayload>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      description: store.description!,
    },
  })
