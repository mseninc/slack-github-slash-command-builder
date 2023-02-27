import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CopyButton } from "@/components/elements/CopyButton";

type CommandTextProps = {
  text: string;
};

export function CommandText({ text }: CommandTextProps) {
  return (
    <InputGroup>
      <Input defaultValue={text} title={text} isReadOnly fontFamily="consolas,monospace" />
      <InputRightElement w="4.5em">
        <CopyButton variant="solid" size="xs" w="4em" value={text} />
      </InputRightElement>
    </InputGroup>
  );
}
