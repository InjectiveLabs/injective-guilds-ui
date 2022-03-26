export enum AppState {
  Busy = 'Busy',
  Loading = 'Loading',
  Idle = 'Idle',
  Error = 'Error',
  Success = 'Success'
}

export enum ChartInterval {
  Day = '24H',
  Week = '7D',
  TwoWeek = '14D',
  Month = '30D',
  All = 'ALL'
}

export enum Modal {
  ConnectWallet = 'connect-wallet',
  LeaveGuild = 'leave-guild',
  JoinAGuild = 'join-a-guild'
}

export enum WalletConnectStatus {
  connecting = 'Connecting',
  disconnected = 'Disconnected',
  idle = 'Idle',
  connected = 'Connected'
}
