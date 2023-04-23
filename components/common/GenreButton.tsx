import React from "react";
import { ButtonComponentType, Button } from "./Button";

function GenreButton() {
  return (
    <Button as={ButtonComponentType.BUTTON} type="submit">
      hELLO
    </Button>
  );
}

export default GenreButton;
