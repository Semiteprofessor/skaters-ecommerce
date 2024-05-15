"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { productPayload, productSchema } from "@/lib/validators/product";

import { FileUpload } from "./FileUpload";

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (values: productPayload) => {
    try {
      setIsLoading(true)
      const { data }: { data: Product } = await axios.post(
        `/api/stores/${params.storeId}/products`,
        values,
      )
      toast.success('Product is created.')
      router.push(`/${data.storeId}/${data.slug}?productId=${data.id}`)
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }
