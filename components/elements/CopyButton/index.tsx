import { Button, ButtonProps } from "@chakra-ui/react";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

type CopyButtonProps = ButtonProps & {
  value: string;
  text?: string;
  copiedText?: string;
  failedText?: string;
};

export const CopyButton = ({
  value,
  text: proptext = "Copy",
  copiedText = "Copied",
  failedText = "Failed",
  ...rest
}: CopyButtonProps) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(proptext);

  useEffect(() => {
    setActive(!!navigator.clipboard);
  }, []);

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();
      if (!active) return;
      if (navigator.clipboard) {
        const showResult = (msg: string) => {
          setText(msg);
          setTimeout(() => {
            setText(proptext);
          }, 1000);
        };
        try {
          await navigator.clipboard.writeText(value);
          showResult(copiedText);
        } catch {
          showResult(failedText);
        }
      } else {
        setActive(false);
      }
    },
    [active, value, proptext, copiedText, failedText, setText, setActive],
  );

  return (
    <Button
      onClick={handleClick}
      {...rest}
      isDisabled={!active}
      colorScheme={text === copiedText ? "green" : text === failedText ? "red" : rest.colorScheme}
    >
      {text}
    </Button>
  );
};
