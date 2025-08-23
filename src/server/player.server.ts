import { PlayerData } from "shared/types";
import { DataStoreService, Players, UserInputService } from "@rbxts/services";
import { getEvent } from "shared/events";

// ========= VARIABLES =========

export const DATA_STORE_NAME = "Battlegrounds_UserData";
const dataStore = DataStoreService.GetDataStore(DATA_STORE_NAME);
const userInputService = game.GetService("UserInputService");

// ========= FUNCTIONS =========

const isMobile = () => {
	return UserInputService.TouchEnabled;
};

// const removeMobileMovementGui = (player: Player) => {
// 	if (isMobile()) {
// 		print("Removing mobile movement GUI");
// 		// Disable the player's GUI on mobile using StarterGui service
// 		// This will disable core mobile controls like the joystick
// 		const starterGui = game.GetService("StarterGui");
// 		starterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
// 	}
// };

// const enableMobileMovementGui = (player: Player) => {
// 	if (isMobile()) {
// 		print("Re-enabling mobile movement GUI");
// 		// Re-enable the player's GUI on mobile
// 		const starterGui = game.GetService("StarterGui");
// 		starterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, true);
// 	}
// };

const getDefaultUserData = (player: Player): PlayerData => {
	return {
		userId: player.UserId,
		username: player.Name,
		rating: 0,
		tutorialCompleted: false,
		lastSavedAt: os.time(),
		firstPlaceCount: 0,
		secondPlaceCount: 0,
		thirdPlaceCount: 0,
		fourthPlaceCount: 0,
		lossesCount: 0,
		gamesCount: 0,
		creaturesBoughtCount: 0,
		creaturesSoldCount: 0,
		creaturesPlayedCount: 0,
		creaturesKilledCount: 0,
		creaturesEvolvedCount: 0,
		joinCount: 0,
		joinedAt: os.time(),
		timePlayed: 0,
	};
};

const getPlayerData = (player: Player): PlayerData => {
	const key = `user_${player.UserId}`;
	const [success, response] = pcall(() => {
		return dataStore.GetAsync(key);
	});
	if (success && response) {
		const playerData = response as PlayerData;
		return playerData;
	} else {
		warn(`❌ Error loading data for ${player.Name}: ${response}`);
	}
	return getDefaultUserData(player);
};

const migrateUserData = (player: Player, userData: PlayerData): PlayerData => {
	const defaultUserData = getDefaultUserData(player);
	return {
		...defaultUserData,
		...userData,
	};
};

const savePlayerData = (player: Player, userData: PlayerData, updateTimePlayed: boolean = false): void => {
	userData = migrateUserData(player, userData);

	const key = `user_${player.UserId}`;
	if (updateTimePlayed) {
		userData.timePlayed += os.time() - userData.lastSavedAt;
	}
	userData.lastSavedAt = os.time();
	const [success, response] = pcall(() => {
		dataStore.SetAsync(key, userData);
	});
	if (!success) {
		error(`❌ Failed to save data for user ${player.UserId}: ${response}`);
	}
};

const handlePlayerJoin = (player: Player): void => {
	const userData = getPlayerData(player);
	print(userData);
	userData.joinCount++;
	userData.joinedAt = tick();
	savePlayerData(player, userData);
};

const handlePlayerLeave = (player: Player): void => {
	const userData = getPlayerData(player);
	// save to update timePlayed
	savePlayerData(player, userData, true);
};

const disablePlayerDamage = (player: Player): void => {
	const character = player.Character;
	if (!character) return;

	const humanoid = character.FindFirstChild("Humanoid") as Humanoid;
	if (!humanoid) return;

	humanoid.HealthChanged.Connect((health) => {
		if (health > humanoid.MaxHealth) {
			humanoid.Health = humanoid.MaxHealth;
		}
	});
};

const disablePlayerInventory = (player: Player): void => {
	const character = player.Character;
	if (!character) return;

	// Remove existing tools
	character.GetChildren().forEach((child) => {
		if (child.IsA("Tool")) {
			child.Destroy();
		}
	});

	// Prevent new tools from being added
	character.ChildAdded.Connect((child) => {
		if (child.IsA("Tool")) {
			child.Destroy();
		}
	});
};

// ========= EVENTS =========

Players.PlayerAdded.Connect((player: Player) => {
	handlePlayerJoin(player);
	getEvent("Player", "PlayerDataReadyBE", "BindableEvent").Fire(player);
	getEvent("Player", "PlayerDataReadyRE", "RemoteEvent").FireClient(player);

	// Handle character spawning for this player
	player.CharacterAdded.Connect(() => {
		wait(1); // Wait for character to fully load
		disablePlayerDamage(player);
		disablePlayerInventory(player);
		print(`✅ Player damage and inventory systems disabled for ${player.Name}`);
	});
});

Players.PlayerRemoving.Connect((player: Player) => {
	handlePlayerLeave(player);
	getEvent("Player", "PlayerDisconnectedBE", "BindableEvent").Fire(player);
});

getEvent("Player", "PlayerMovementEnableRE", "RemoteEvent").OnServerEvent.Connect((player: Player) => {
	const character = player.Character;
	if (!character) return;
	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (!humanoid) return;
	humanoid.WalkSpeed = 20;
	humanoid.JumpHeight = 50;
	humanoid.JumpPower = 50;

	// Re-enable mobile GUI when movement is enabled
	// enableMobileMovementGui(player);
});

getEvent("Player", "PlayerMovementDisableRE", "RemoteEvent").OnServerEvent.Connect((player: Player) => {
	const character = player.Character;
	if (!character) return;
	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (!humanoid) return;
	humanoid.WalkSpeed = 0;
	humanoid.JumpHeight = 0;
	humanoid.JumpPower = 0;

	// Disable mobile GUI when movement is disabled
	// removeMobileMovementGui(player);
});

// ==========================
