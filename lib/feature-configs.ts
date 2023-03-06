import { FeatureConfig, FeatureKey, FeatureKeys } from "@/resources/FeatureDefinitions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useFeatureConfigs() {
  const router = useRouter();
  const query = router.query;
  const [current, setCurrent] = useState<FeatureConfig[] | undefined>(undefined);

  useEffect(() => {
    const initValue = decodeFromQuery(query);
    if (initValue.length) {
      setCurrent(initValue);
      return;
    }
  }, [query, setCurrent]);

  const update = (value: FeatureConfig[]) => {
    setCurrent(value);
    const encoded = encodeToQuery(value);
    const orgQuery = { ...router.query };
    for (const key of FeatureKeys) {
      delete orgQuery[key];
    }
    const query = { ...orgQuery, ...encoded };
    if (orgQuery !== query) {
      router.replace({ query });
    }
  };
  return { current, update };
}

const ARGUMENT_DELIMITER = ".";
const ESCAPED_DOT = "_DOT_";
const TRUE = "1";
const FALSE = "0";

export function encodeToQuery(array: FeatureConfig[]): { [key in FeatureKey]: string } {
  const result = {} as { [key in FeatureKey]: string };
  for (const { key, selected, argument } of array?.filter(
    ({ selected, argument }) => selected || argument,
  )) {
    result[key] = [
      selected ? TRUE : FALSE,
      argument?.replace(ARGUMENT_DELIMITER, ESCAPED_DOT) ?? null,
    ]
      .filter(Boolean)
      .join(ARGUMENT_DELIMITER);
  }
  return result;
}

export function decodeFromQuery(query: {
  [key: string]: string | string[] | undefined;
}): FeatureConfig[] {
  return Object.entries(query)
    .filter(([key]) => FeatureKeys.includes(key as FeatureKey))
    .filter(([_, value]) => typeof value === "string")
    .map(([key, value]) => {
      const [selected, argument] = `${value}`.split(ARGUMENT_DELIMITER);
      return {
        key: key as FeatureKey,
        selected: selected === TRUE,
        argument: argument?.replace(ESCAPED_DOT, ARGUMENT_DELIMITER) ?? null,
      };
    });
}
