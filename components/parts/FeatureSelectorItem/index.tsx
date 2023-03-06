import { Box, Checkbox, HStack, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { ChangeEvent, useCallback } from "react";
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
  const handleCheckBoxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
        argument: e.currentTarget.value ?? null,
      };
      onChange?.(newValue);
    },
    [feature, value, onChange],
  );

  const isPredefinedValue = feature.argumentOptions?.some((x) => x.key === `${value?.argument}`);
  const needsUserInput = feature.argumentOptions?.some((x) => x.key === ARGUMENT_OPTION_USER_INPUT);
  const radioValue = !value?.argument
    ? ARGUMENT_OPTION_NO_ARGUMENT
    : isPredefinedValue
    ? `${value?.argument}`
    : "";
  const inputVal = isPredefinedValue ? "" : value?.argument ?? "";

  return (
    <HStack>
      <Checkbox isChecked={value?.selected} value={feature.key} onChange={handleCheckBoxChange}>
        {feature.displayLabel}
      </Checkbox>
      <Box flex={1} />
      {feature.argumentOptions && (
        <RadioGroup
          onChange={handleArgOptionChange}
          isDisabled={!value?.selected}
          value={radioValue}
        >
          <HStack>
            {feature.argumentOptions
              ?.filter((x) => x.key !== ARGUMENT_OPTION_USER_INPUT)
              ?.map((argOption) => {
                return (
                  <HStack key={argOption.key}>
                    <Radio value={argOption.key}>{argOption.displayLabel}</Radio>
                  </HStack>
                );
              })}
            {needsUserInput && <Input size="sm" value={inputVal} onChange={handleInputChange} />}
          </HStack>
        </RadioGroup>
      )}
    </HStack>
  );
}
