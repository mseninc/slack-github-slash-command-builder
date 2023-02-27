import {
  Box,
  Center,
  Container,
  FormControl,
  Heading,
  Link,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { CommandModeSelector } from "@/components/parts/CommandModeSelector";
import { CommandText } from "@/components/parts/CommandText";
import { FeatureSelector } from "@/components/parts/FeatureSelector";
import { getCommandText } from "@/lib/command";
import { FeatureConfig } from "@/resources/FeatureDefinitions";
import { CommandMode } from "@/types/CommandMode";

export default function App() {
  const [repoNames, setRepoNames] = useState("org/repo");
  const [mode, setMode] = useState<CommandMode>("subscribe");
  const [config, setConfig] = useState<FeatureConfig[]>([]);

  const resultCommands = useMemo(() => {
    const commanLines = repoNames
      .trim()
      .split("\n")
      .map((repo) => getCommandText({ repo, mode, config }));
    return commanLines.map((c) => {
      return <CommandText key={c} text={c} />;
    });
  }, [mode, repoNames, config]);

  return (
    <>
      <Container maxW="4xl">
        <Box py={8}>
          <Heading whiteSpace="pre-line" textAlign="center">
            {"Slack + GitHub slash command builder"}
          </Heading>
        </Box>
        <Container mt={2}>
          <Text textAlign="center">
            Simple command builder for{" "}
            <Link href="https://github.com/integrations/slack" color="blue.500" isExternal>
              GitHub + Slack Integration
            </Link>
          </Text>
        </Container>
        <Container mt={8} py={4}>
          <Center mb={4}>
            <CommandModeSelector value={mode} onChange={setMode} />
          </Center>
          {/* <hr /> */}
          <Box mt={4}>
            <FeatureSelector value={config} onChange={setConfig} />
          </Box>
          <Heading size="md" mt={4} py={4}>
            {"Repos"}
            <Text as="span" fontWeight="normal" fontSize="sm" ml={2}>
              (<code>org/repo</code> or <code>https://github.com/org/repo</code>)
            </Text>
          </Heading>
          <FormControl>
            <Textarea
              defaultValue={repoNames}
              onChange={(e) => setRepoNames(e.currentTarget.value)}
            ></Textarea>
          </FormControl>
          <Heading size="md" mt={4} py={4}>
            Slash commands
          </Heading>
          <VStack alignItems="stretch">{resultCommands}</VStack>
        </Container>
        <Box mt={8}>
          <Text textAlign="center">
            &copy;{" "}
            <Link href="https://github.com/mseninc" color="blue.500" isExternal>
              MSEN Inc.
            </Link>{" "}
            The code repo is{" "}
            <Link
              href="https://github.com/mseninc/slack-github-slash-command-builder"
              color="blue.500"
              isExternal
            >
              here
            </Link>
            . Do not hesitate to report issues.
          </Text>
        </Box>
      </Container>
    </>
  );
}
