const Players = game.GetService("Players");

const localPlayer = Players.LocalPlayer;

// ========= PLAYER SYSTEM CONFIGURATION =========

const disablePlayerDamage = (): void => {
	const character = localPlayer.Character;
	if (!character) return;

	const humanoid = character.FindFirstChild("Humanoid") as Humanoid;
	humanoid.HealthChanged.Connect((health) => {
		if (health > humanoid.MaxHealth) {
			humanoid.Health = humanoid.MaxHealth;
		}
	});
};

const disablePlayerInventory = (): void => {
	const character = localPlayer.Character;
	if (!character) return;

	character.GetChildren().forEach((child) => {
		if (child.IsA("Tool")) {
			child.Destroy();
		}
	});

	localPlayer.ChildAdded.Connect((child) => {
		if (child.IsA("Tool")) {
			child.Destroy();
		}
	});
};

localPlayer.CharacterAdded.Connect(() => {
	wait(1); // Wait for character to fully load
	disablePlayerDamage();
	disablePlayerInventory();
	print("✅ Player damage and inventory systems disabled");
});
