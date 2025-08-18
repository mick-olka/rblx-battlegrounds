export const PlayerEvents = {
	// Remote Functions [Client <-> Server]
	PlayerTestRF: { name: "PlayerTestRF", type: "RemoteFunction" },

	// Remote Events [Client <-> Server]
	PlayerTestRE: { name: "PlayerTestRE", type: "RemoteEvent" },
	PlayerDataReadyRE: { name: "PlayerDataReadyRE", type: "RemoteEvent" },
	PlayerMovementEnableRE: { name: "PlayerMovementEnableRE", type: "RemoteEvent" },
	PlayerMovementDisableRE: { name: "PlayerMovementDisableRE", type: "RemoteEvent" },

	// Bindable Functions [Server -> Server or Client -> Client]
	PlayerTestBF: { name: "PlayerTestBF", type: "BindableFunction" },

	// Bindable Events [Server -> Server or Client -> Client]
	PlayerTestBE: { name: "PlayerTestBE", type: "BindableEvent" },
	PlayerDataReadyBE: { name: "PlayerDataReadyBE", type: "BindableEvent" },
	PlayerDisconnectedBE: { name: "PlayerDisconnectedBE", type: "BindableEvent" },
} as const;
