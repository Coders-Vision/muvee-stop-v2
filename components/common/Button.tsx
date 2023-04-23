import React, { ReactNode } from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export enum ButtonComponentType {
  LINK = "link",
  BUTTON = "button",
}

type ButtonComponentProps<T extends ButtonComponentType> = {
  as: T;
  children: ReactNode;
  // based on the "as" value, either intersect with ButtonProps or AnchorProps
} & (T extends ButtonComponentType.BUTTON ? ButtonProps : AnchorProps);

export function Button<T extends ButtonComponentType>({
  children,
  as,
  ...restProps
}: ButtonComponentProps<T>) {
  if (as === ButtonComponentType.LINK)
    return <a {...(restProps as AnchorProps)}>{children}</a>;
  if (as === ButtonComponentType.BUTTON)
    return (
      <button
        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap  py-1 px-3 leading-normal no-underline text-gray-300 border-gray-300  bg-none hover:bg-teal-600 active  rounded-3xl transform-300"
        {...(restProps as ButtonProps)}
      >
        {children}
      </button>
    );
  return null;
}
