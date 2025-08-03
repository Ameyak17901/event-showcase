import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate as formatDateFns } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date){
  return formatDateFns(date, "MM/dd/yyyy")
}
