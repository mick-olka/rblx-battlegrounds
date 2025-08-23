const Players = game.GetService("Players");

const localPlayer = Players.LocalPlayer;

localPlayer.CharacterAdded.Connect(() => {
	// print("✅ Player character loaded - damage and inventory systems managed by server");
});
