import React from "react";
import { cn } from "../../utils/cn";

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}) {
  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800 shadow-sm border border-transparent dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-transparent dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700",
    outline: "bg-transparent text-slate-700 hover:bg-slate-50 border border-slate-300 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-800",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent dark:text-slate-200 dark:hover:bg-slate-800",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-transparent dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 flex items-center justify-center p-0"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
