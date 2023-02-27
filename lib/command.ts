import { FeatureConfig, FeatureDefinitions } from "@/resources/FeatureDefinitions";
import { CommandMode } from "@/types/CommandMode";

export function extractRepoName(repoName: string) {
  if (!repoName.match(/^https?:\/\//)) {
    return repoName;
  }
  const pathParts = new URL(repoName).pathname.split("/");
  if (pathParts.length >= 3) {
    return pathParts.slice(1, 3).join("/");
  }
  return repoName;
}

export function getCommandText({
  repo,
  mode,
  config,
}: {
  repo: string;
  mode: CommandMode;
  config: FeatureConfig[];
}) {
  const repoName = extractRepoName(repo);
  const features = config
    .filter((x) => x.selected)
    .map((x) => {
      const command = [FeatureDefinitions[x.key].command];
      if (x.argument) {
        command.push(`"${x.argument}"`);
      }
      return command.join(":");
    });
  return `/github ${mode} ${repoName} ${features.join(" ")}`.trimEnd();
}
