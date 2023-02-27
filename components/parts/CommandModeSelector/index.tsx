import { Radio, RadioGroup } from "@chakra-ui/react";
import { useCallback } from "react";
import { CommandMode, CommandModes } from "@/types/CommandMode";

type CommandModeSelectorProps = {
  value: CommandMode;
  onChange?: (mode: CommandMode) => void;
};

export function CommandModeSelector({ value, onChange }: CommandModeSelectorProps): JSX.Element {
  const handleRadioChange = useCallback(
    (nextValue: CommandMode) => {
      onChange?.(nextValue);
    },
    [onChange],
  );

  return (
    <RadioGroup
      onChange={handleRadioChange}
      defaultValue={CommandModes[0]}
      size="lg"
      colorScheme="teal"
      value={value}
    >
      {CommandModes.map((mode) => {
        return (
          <Radio key={mode} value={mode} mr={4}>
            {mode}
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
