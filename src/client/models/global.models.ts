import { ReactNode } from "@rbxts/react";

export type WithChildren = {
	children: ReactNode;
};

export enum GameStages {
	Tavern = "Tavern",
	Battle = "Battle",
}

export interface GameData {
	turn: number;
	typesInGame: string[];
	specialEffect: string;
	players: string[]; // player session id
}

export interface PlayerGameSessionData {
	id: string;
	playerId: string;
	coins: string;
	shopLevel: number;
	minions: string[];
	hand: string[];
}

export enum CardClass {
	Minion = "minion",
	Bonus = "Bonus",
}

export enum CardType {
	Brainrot = "Brainrot",
	Human = "Human",
	Animal = "Animal",
}

export enum Ability {
	Rebort = "Rebort",
	Battlecry = "Battlecry",
	Curse = "Curse",
	Trigger = "Trigger",
	Battle = "Battle",
	Bubbles = "Bubbles",
	Poison = "Poison",
	Rage = "Rage",
}

export interface CardData {
	id: string;
	name: string;
	health: number;
	attack: number;
	class: CardClass;
	types: CardType[];
	attackBonus: number; // in-fight bonus
	healthBonus: number;
	image: string;
	description: string;
	abilities: Ability[];
	perTurnAttackBonus: number;
	perTurnHealthBonus: number;
}
