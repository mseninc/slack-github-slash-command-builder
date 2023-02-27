import { extractRepoName, getCommandText } from "@/lib/command";
import { FeatureConfig } from "@/resources/FeatureDefinitions";
import { CommandMode } from "@/types/CommandMode";

describe("lib/command", () => {
  describe("extractRepoName", () => {
    // repo name from url
    const urlCases = [
      ["https://github.com/kenzauros/react-auth-with-cognito", "kenzauros/react-auth-with-cognito"],
      ["https://github.com/kenzauros/rharbor/issues/1", "kenzauros/rharbor"],
    ];
    test.each(urlCases)('extractRepoName("%s") returns "%s"', (url, expected) => {
      const actual = extractRepoName(url);
      expect(actual).toBe(expected);
    });
    // other than url
    const otherCases = [
      ["kenzauros/react-auth-with-cognito", "kenzauros/react-auth-with-cognito"],
      ["other texts", "other texts"],
    ];
    test.each(otherCases)('("%s") returns "%s"', (url, expected) => {
      const actual = extractRepoName(url);
      expect(actual).toBe(expected);
    });
  });
  describe.only("getCommandText", () => {
    const rightCases = [
      {
        mode: "subscribe",
        config: [{ key: "issues", selected: true }],
        expected: "/github subscribe org/repo issues",
      },
      {
        mode: "unsubscribe",
        config: [{ key: "commits", selected: true, argument: "*" }],
        expected: '/github unsubscribe org/repo commits:"*"',
      },
    ];
    test.each(rightCases)('returns "$expected"', ({ mode, config, expected }) => {
      const actual = getCommandText({
        repo: "org/repo",
        mode: mode as CommandMode,
        config: config as FeatureConfig[],
      });
      expect(actual).toBe(expected);
    });
  });
});
