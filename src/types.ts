export interface userEnteredMessageDetails {
  userMessages: string,
  timestamp: string
}

export interface WorkspaceChannelDetails {
  name : string
}

export interface WorkspaceUserDetails {
  displayName: string,
  displayChannels: WorkspaceChannelDetails[]
}