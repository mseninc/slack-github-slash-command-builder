const CommandMode = {
  subscribe: "subscribe",
  unsubscribe: "unsubscribe",
} as const;

export type CommandMode = (typeof CommandMode)[keyof typeof CommandMode];

export const CommandModes = Object.values<CommandMode>(CommandMode);
