type ARGUMENT_OPTION_NO_ARGUMENT = "___NONE___";
export const ARGUMENT_OPTION_NO_ARGUMENT: ARGUMENT_OPTION_NO_ARGUMENT = "___NONE___";

type ARGUMENT_OPTION_USER_INPUT = "___USER_INPUT___";
export const ARGUMENT_OPTION_USER_INPUT: ARGUMENT_OPTION_USER_INPUT = "___USER_INPUT___";

const FeatureKey = {
  issues: "issues",
  pulls: "pulls",
  commits: "commits",
  releases: "releases",
  deployments: "deployments",
  workflows: "workflows",
  reviews: "reviews",
  comments: "comments",
  branches: "branches",
  label: "label",
  discussions: "discussions",
} as const;

export type FeatureKey = (typeof FeatureKey)[keyof typeof FeatureKey];

export const FeatureKeys = Object.values<FeatureKey>(FeatureKey);

export interface FeatureDefinition {
  readonly order: number;
  readonly key: FeatureKey;
  readonly displayLabel: string;
  readonly command: string;
  readonly description: string;
  readonly isDefault: boolean;
  readonly argmentOptions:
    | null
    | readonly (ARGUMENT_OPTION_NO_ARGUMENT | ARGUMENT_OPTION_USER_INPUT | string)[];
}

export const FeatureDefinitions: { [key in FeatureKey]: FeatureDefinition } = {
  issues: {
    order: 1,
    key: "issues",
    displayLabel: "issues",
    command: "issues",
    description: "Opened or closed issues",
    isDefault: true,
    argmentOptions: null,
  },
  pulls: {
    order: 2,
    key: "pulls",
    displayLabel: "pulls",
    command: "pulls",
    description:
      'New or merged pull requests, as well as draft pull requests marked "Ready for Review"',
    isDefault: true,
    argmentOptions: null,
  },
  commits: {
    order: 3,
    key: "commits",
    displayLabel: "commits",
    command: "commits",
    description: "New commits on the default branch (usually main)",
    isDefault: true,
    argmentOptions: [ARGUMENT_OPTION_NO_ARGUMENT, "*", ARGUMENT_OPTION_USER_INPUT],
  },
  releases: {
    order: 4,
    key: "releases",
    displayLabel: "releases",
    command: "releases",
    description: "Published releases",
    isDefault: true,
    argmentOptions: null,
  },
  deployments: {
    order: 5,
    key: "deployments",
    displayLabel: "deployments",
    command: "deployments",
    description: "Deployment status updates.",
    isDefault: true,
    argmentOptions: null,
  },
  workflows: {
    order: 6,
    key: "workflows",
    displayLabel: "workflows",
    command: "workflows",
    description: "Actions workflow run notifications",
    isDefault: false,
    argmentOptions: null,
  },
  reviews: {
    order: 7,
    key: "reviews",
    displayLabel: "reviews",
    command: "reviews",
    description: "Pull request reviews",
    isDefault: false,
    argmentOptions: [ARGUMENT_OPTION_NO_ARGUMENT, "channel"],
  },
  comments: {
    order: 8,
    key: "comments",
    displayLabel: "comments",
    command: "comments",
    description: "New comments on issues and pull requests",
    isDefault: false,
    argmentOptions: [ARGUMENT_OPTION_NO_ARGUMENT, "channel"],
  },
  branches: {
    order: 9,
    key: "branches",
    displayLabel: "branches",
    command: "branches",
    description: "Created or deleted branches",
    isDefault: false,
    argmentOptions: null,
  },
  label: {
    order: 910101,
    key: "label",
    displayLabel: "filtered by label",
    command: "+label",
    description: "Filter issues, pull-requests and comments based on their labels.",
    isDefault: false,
    argmentOptions: [ARGUMENT_OPTION_USER_INPUT],
  },
  discussions: {
    order: 1011111,
    key: "discussions",
    displayLabel: "discussions",
    command: "discussions",
    description: "Discussions created or answered",
    isDefault: false,
    argmentOptions: null,
  },
} as const;

export interface FeatureConfig {
  key: FeatureKey;
  selected: boolean;
  argument?: string | null;
}
