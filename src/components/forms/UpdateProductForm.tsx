"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
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

export function UpdateProductForm({ product }: { product: Product }) {
  const params = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description!,
      category: product.categoryId,
      price: parseFloat(String(product.price)),
      // @ts-ignore
      images: product.images,
    },
  })

  const onSubmit = async (values: productPayload) => {
    try {
      setIsLoading(true)
      await axios.patch(
        `/api/stores/${params.storeId}/products/${product.id}`,
        values,
      )
      toast.success('Product has been updated.')
      window.location.assign(`/dashboard/stores/${params.storeId}`)
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }
