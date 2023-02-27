import { Box, Checkbox, HStack, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useRef } from "react";
import {
  ARGUMENT_OPTION_NO_ARGUMENT,
  ARGUMENT_OPTION_USER_INPUT,
  FeatureConfig,
  FeatureDefinition,
} from "@/resources/FeatureDefinitions";

type FeatureSelectorItemProps = {
  feature: FeatureDefinition;
  value?: FeatureConfig;
  onChange?: (config: FeatureConfig) => void;
};

export function FeatureSelectorItem({
  feature,
  value,
  onChange,
}: FeatureSelectorItemProps): JSX.Element {
  const radioRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckBoxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // setSelected(e.currentTarget.checked);
      const newValue: FeatureConfig = {
        ...(value ?? { key: feature.key, selected: false }),
        selected: e.currentTarget.checked,
      };
      onChange?.(newValue);
    },
    [feature, value, onChange],
  );

  const handleArgOptionChange = useCallback(
    (nextValue: string) => {
      const newValue: FeatureConfig = {
        ...(value ?? { key: feature.key, selected: false }),
      };
      switch (nextValue) {
        case ARGUMENT_OPTION_USER_INPUT:
          newValue.argument = inputRef.current?.value;
          break;
        case ARGUMENT_OPTION_NO_ARGUMENT:
          newValue.argument = null;
          break;
        default:
          newValue.argument = nextValue;
          break;
      }
      onChange?.(newValue);
    },
    [feature, value, onChange],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue: FeatureConfig = {
        ...(value ?? { key: feature.key, selected: false }),
        argument: radioRef.current?.checked ? e.currentTarget.value : "",
      };
      onChange?.(newValue);
    },
    [feature, value, onChange],
  );

  return (
    <HStack>
      <Checkbox isChecked={value?.selected} value={feature.key} onChange={handleCheckBoxChange}>
        {feature.displayLabel}
      </Checkbox>
      <Box flex={1} />
      {feature.argmentOptions && (
        <RadioGroup
          onChange={handleArgOptionChange}
          isDisabled={!value?.selected}
          defaultValue={feature.argmentOptions[0]}
        >
          <HStack>
            {feature.argmentOptions?.map((arg, i) => {
              const label =
                arg === ARGUMENT_OPTION_USER_INPUT
                  ? ""
                  : arg === ARGUMENT_OPTION_NO_ARGUMENT
                  ? "none"
                  : arg;
              const inputVal = feature.argmentOptions?.includes(`${value?.argument}`)
                ? ""
                : value?.argument?.toString();
              return (
                <HStack key={arg}>
                  <Radio
                    ref={arg === ARGUMENT_OPTION_USER_INPUT ? radioRef : undefined}
                    defaultChecked={i === 0}
                    value={arg}
                  >
                    {label}
                  </Radio>
                  {arg === ARGUMENT_OPTION_USER_INPUT && (
                    <Input ref={inputRef} size="sm" value={inputVal} onChange={handleInputChange} />
                  )}
                </HStack>
              );
            })}
          </HStack>
        </RadioGroup>
      )}
    </HStack>
  );
}
