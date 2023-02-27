import { Button, ButtonGroup, HStack, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { FeatureSelectorItem } from "../FeatureSelectorItem";
import { FeatureConfig, FeatureDefinitions, FeatureKeys } from "@/resources/FeatureDefinitions";

type FeatureSelectorProps = {
  value: FeatureConfig[];
  onChange?: (config: FeatureConfig[]) => void;
};

export function FeatureSelector({ value, onChange }: FeatureSelectorProps): JSX.Element {
  const handleChange = useCallback(
    (config: FeatureConfig) => {
      const newValue = [...value];
      const index = newValue.findIndex((x) => x.key === config.key);
      if (index > -1) {
        newValue.splice(index, 1, config);
      } else {
        newValue.push(config);
      }
      newValue.sort((a, b) => FeatureDefinitions[a.key].order - FeatureDefinitions[b.key].order);
      onChange?.(newValue);
    },
    [value, onChange],
  );

  const handleChangeAll = useCallback(
    (val: boolean | undefined) => {
      const missing = FeatureKeys.filter((key) => !value.some((x) => x.key === key)).map((key) => ({
        key,
        selected: false,
      }));
      const newValue = [...value, ...missing];
      for (const c of newValue) {
        c.selected = val ?? !c.selected;
      }
      newValue.sort((a, b) => FeatureDefinitions[a.key].order - FeatureDefinitions[b.key].order);
      onChange?.(newValue);
    },
    [value, onChange],
  );

  const handleResetToDefault = useCallback(() => {
    const defaults = FeatureKeys.filter((key) => FeatureDefinitions[key].isDefault).map((key) => ({
      key,
      selected: true,
    }));
    const remains = FeatureKeys.filter((key) => !FeatureDefinitions[key].isDefault)
      .map((key) => value.find((x) => x.key === key))
      .filter((x): x is FeatureConfig => Boolean(x));
    for (const c of remains) {
      c.selected = false;
    }
    const newValue = [...remains, ...defaults];
    newValue.sort((a, b) => FeatureDefinitions[a.key].order - FeatureDefinitions[b.key].order);
    onChange?.(newValue);
  }, [value, onChange]);

  return (
    <VStack alignItems="stretch">
      {FeatureKeys.map((x) => (
        <FeatureSelectorItem
          key={x}
          feature={FeatureDefinitions[x]}
          value={value?.find((y) => y.key === x)}
          onChange={handleChange}
        />
      ))}
      <HStack pt={2}>
        <ButtonGroup variant="outline" size="sm" spacing="2">
          <Button colorScheme="blue" onClick={() => handleChangeAll(true)}>
            All On
          </Button>
          <Button colorScheme="gray" onClick={() => handleChangeAll(false)}>
            All Off
          </Button>
          <Button colorScheme="yellow" onClick={() => handleChangeAll(undefined)}>
            Toggle
          </Button>
          <Button colorScheme="green" onClick={() => handleResetToDefault()}>
            Default
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
}
