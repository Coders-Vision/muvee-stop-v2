import React from "react";
import { ButtonComponentType, Button } from "./Button";

type GenreButtonProps = {
  btnTitle: string;
  activeClass?: string;
  btnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
function GenreButton({ btnTitle, btnProps, activeClass }: GenreButtonProps) {
  return (
    <Button
      as={ButtonComponentType.BUTTON}
      {...btnProps}
      activeClass={activeClass}
      type="submit"
    >
      {btnTitle}
    </Button>
  );
}

export default GenreButton;
