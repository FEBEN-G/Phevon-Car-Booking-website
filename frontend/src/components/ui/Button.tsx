import React from 'react';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-primary to-[#FF8C61] text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0',
      secondary: 'bg-gray-100 text-dark hover:bg-gray-200 hover:shadow-md',
      outline: 'border-2 border-primary text-primary hover:bg-primary/5',
      ghost: 'bg-transparent text-gray-500 hover:text-dark hover:bg-gray-50'
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
