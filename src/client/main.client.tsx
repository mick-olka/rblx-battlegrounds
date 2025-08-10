// import { getEvent } from "shared/events";
import { createRoot } from "@rbxts/react-roblox";
import React, { StrictMode } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { App } from "./app";
import { makeHello } from "shared/module";

const Players = game.GetService("Players");
// const StarterGui = game.GetService("StarterGui");

print(makeHello("main.client.ts"));

// getEvent("User", "UserDataReadyRE", "RemoteEvent").OnClientEvent.Connect((data: string) => {
// 	print(data);
// });

function mountApp(player: Player) {
	const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;

	const screenGui = new Instance("ScreenGui");
	screenGui.Name = "ReactApp";
	screenGui.ResetOnSpawn = false;
	screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
	screenGui.Parent = playerGui;

	const root = createRoot(new Instance("Folder"));

	root.render(<StrictMode>{createPortal(<App />, screenGui)}</StrictMode>);
}

function initReact() {
	if (Players.LocalPlayer) {
		mountApp(Players.LocalPlayer);
	}
}

initReact();
