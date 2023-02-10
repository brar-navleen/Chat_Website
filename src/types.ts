export interface userEnteredMessageDetails {
  userMessages: string,
  timestamp: string
}

export interface WorkspaceChannelDetails {
  name: string
}

export interface UsersInvolved {
  id: number,
  name: string  
}


export interface DirectMessageDetails {
  id: number,
  usersInvolved: UsersInvolved[]
}

export interface WorkspaceUserDetails {
  displayName: string,
  displayChannels: WorkspaceChannelDetails[],
  listOfPeopleDirectMsgIsSentTo: DirectMessageDetails[]
}


// directMessageDetails = [
//   {
//     id: 1,
//     usersInvolved: [
//       {
//         id: 1,
//         name: 'ram'
//       },
//       {
//         id:2,
//         name: 'sham'
//       }
//     ]

//   }
// ]