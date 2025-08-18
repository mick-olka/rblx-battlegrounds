import { Players } from "@rbxts/services";

const LOCAL_PLAYER = Players.LocalPlayer;

export function getLocalValue(key: string, defaultValue: boolean) {
	const attribute = LOCAL_PLAYER.GetAttribute(key);
	if (attribute === undefined) return defaultValue;

	return attribute === true;
}

export function setLocalValue(key: string, value: boolean) {
	LOCAL_PLAYER.SetAttribute(key, value);
}
