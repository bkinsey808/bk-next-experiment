import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export default function H1({
  className,
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <h1
      {...props}
      className={clsx(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
