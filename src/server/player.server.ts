import { PlayerData } from "shared/types";
import { DataStoreService, Players } from "@rbxts/services";
import { getEvent } from "shared/events";

// ========= VARIABLES =========

export const DATA_STORE_NAME = "Battlegrounds_UserData";
const dataStore = DataStoreService.GetDataStore(DATA_STORE_NAME);

// ========= FUNCTIONS =========

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

// ========= EVENTS =========

Players.PlayerAdded.Connect((player: Player) => {
	handlePlayerJoin(player);
	getEvent("Player", "PlayerDataReadyBE", "BindableEvent").Fire(player);
	getEvent("Player", "PlayerDataReadyRE", "RemoteEvent").FireClient(player);
});

Players.PlayerRemoving.Connect((player: Player) => {
	handlePlayerLeave(player);
	getEvent("Player", "PlayerDisconnectedBE", "BindableEvent").Fire(player);
});

// ==========================
