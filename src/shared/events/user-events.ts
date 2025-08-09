export const UserEvents = {
	// Remote Functions [Client <-> Server]
	UserTestRF: { name: "UserTestRF", type: "RemoteFunction" },

	// Remote Events [Client <-> Server]
	UserTestRE: { name: "UserTestRE", type: "RemoteEvent" },
	UserDataReadyRE: { name: "UserDataReadyRE", type: "RemoteEvent" },

	// Bindable Functions [Server -> Server or Client -> Client]
	UserTestBF: { name: "UserTestBF", type: "BindableFunction" },

	// Bindable Events [Server -> Server or Client -> Client]
	UserTestBE: { name: "UserTestBE", type: "BindableEvent" },
} as const;
