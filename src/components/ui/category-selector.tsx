"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
 Command,
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from "./command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySelectorComponentProps {
 categories: Category[];
}

export default function CategorySelectorComponent({
 categories,
}: CategorySelectorComponentProps) {
 const [open, setOpen] = useState<boolean>(false);
 const [value, setValue] = useState<string>("");
 const router = useRouter();
 return (
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild>
    <Button
     variant={"outline"}
     role="combobox"
     aria-expanded={open}
     className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-non items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
    >
     {value
      ? categories.find((category) => category._id == value)?.title
      : "Filter by category"}
    </Button>
   </PopoverTrigger>
   <PopoverContent>
    <Command>
     <CommandInput
      onKeyDown={(e) => {
       if (e.key == "Enter") {
        const selectedCategory = categories.find((c) =>
         c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
        );
        if (selectedCategory?.slug?.current) {
         setValue(selectedCategory._id);
         router.push(`/categories/${selectedCategory.slug.current}`);
         setOpen(false);
        }
       }
      }}
     />
     <CommandList>
      <CommandEmpty>No category found.</CommandEmpty>
      <CommandGroup>
       {categories.map((category) => (
        <CommandItem
         key={category._id}
         value={category.title}
         onSelect={() => {
          setValue(value == category._id ? "" : category._id);
          router.push(`/categories/${category.slug?.current}`);
          setOpen(false);
         }}
        >
         {category.title}
         <Check
          className={cn(
           "ml-auto w-4 h-4",
           value == category._id ? "opacity-100" : "opacity-0"
          )}
         />
        </CommandItem>
       ))}
      </CommandGroup>
     </CommandList>
    </Command>
   </PopoverContent>
  </Popover>
 );
}
