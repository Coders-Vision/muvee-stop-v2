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
  activeClass?: string;
  // based on the "as" value, either intersect with ButtonProps or AnchorProps
} & (T extends ButtonComponentType.BUTTON ? ButtonProps : AnchorProps);

export function Button<T extends ButtonComponentType>({
  children,
  as,
  activeClass,
  ...restProps
}: ButtonComponentProps<T>) {
  if (as === ButtonComponentType.LINK)
    return <a {...(restProps as AnchorProps)}>{children}</a>;
  if (as === ButtonComponentType.BUTTON)
    return (
      <div>
        <button
          className={`inline-block  align-middle text-center select-none border-2 rounded-3xl font-normal whitespace-nowrap  py-1 px-3 leading-normal no-underline transform-300  ${
            activeClass
              ? activeClass
              : "  text-gray-300 border-gray-500  bg-none hover:bg-teal-600 active"
          }`}
          {...(restProps as ButtonProps)}
        >
          {children}
        </button>
      </div>
    );
  return null;
}
