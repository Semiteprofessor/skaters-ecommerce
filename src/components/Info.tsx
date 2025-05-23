"use client";

import { Product, Store } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/Separator";

interface InfoProps {
  product: Product & {
    Store: Store;
  };
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    cart.addItem(product);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <h2 className="text-2xl font-medium text-gray-900">
          {/* @ts-ignore */}
          {formatPrice(parseFloat(product.price))}
        </h2>
      </div>
      <p className="my-2 text-muted-foreground">{product.Store.name}</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-6">
        <h3 className="font-medium">Description :</h3>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p>No description</p>
        )}
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
