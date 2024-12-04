"use client";
import { Product } from "@/sanity.types";
import { useBasketStore } from "@/store";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
interface AddToBasketButtonProps {
 product: Product;
 disabled?: boolean;
}
const AddToBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
 const { addItem, removeItem, getItemCount, items } = useBasketStore();
 const itemCount = getItemCount(product._id);
 const [isClient, setIsClient] = useState(false);
 const [isAdded, setIsAdded] = useState(false);
 const quantity =
  items.find((item) => item.product._id === product._id)?.quantity || 0;
 //  use useEffect to set isClient to true after component mounts
 // This ensures that the component only renders on the client-side
 // preventing hydration errors due to server/client mismatch
 useEffect(() => {
  setIsClient(true);
 }, [isClient]);

 const handleAdd = () => {
  addItem(product);
  setIsAdded(true);
 };

 const handleRemove = () => {
  removeItem(product._id);
  if (quantity === 1) {
   setIsAdded(false);
  }
 };

 if (!isAdded) {
  return (
   <Button
    onClick={handleAdd}
    variant="outline"
    className={`text-white hover:text-white flex items-center justify-center transition-colors duration-200
    ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
   >
    Add to Basket
   </Button>
  );
 }

 if (!isClient) return null;
 return (
  <div className="flex items-center justify-center space-x-2">
   <button
    onClick={handleRemove}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
      ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
    disabled={itemCount == 0 || disabled}
   >
    <span
     className={`text-xl font-bold ${itemCount == 0 ? "text-gray-400" : "text-gray-600"}`}
    >
     -
    </span>
   </button>
   <span className="w-8 text-center font-semibold">{itemCount}</span>
   <button
    onClick={handleAdd}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
          ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
    disabled={disabled}
   >
    <span className="text-xl text-white font-bold">+</span>
   </button>
  </div>
 );
};

export default AddToBasketButton;
