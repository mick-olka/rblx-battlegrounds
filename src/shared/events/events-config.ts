import { ReplicatedStorage } from "@rbxts/services";
import { UserEvents } from "./user-events";

export type EventTypes = {
	RemoteFunction: RemoteFunction;
	RemoteEvent: RemoteEvent;
	BindableFunction: BindableFunction;
	BindableEvent: BindableEvent;
};

/*
Remote Functions [Client <-> Server]
Bindable Functions [Server -> Server or Client -> Client]
Remote Events [Client <-> Server]
Bindable Events [Server -> Server or Client -> Client]
*/

export const EVENTS_REGISTRY = {
	User: UserEvents,
} as const;

export type EventsFolderName = keyof typeof EVENTS_REGISTRY;
export type EventName<T extends EventsFolderName> = keyof (typeof EVENTS_REGISTRY)[T] extends string
	? keyof (typeof EVENTS_REGISTRY)[T]
	: never;

export type EventInstance = EventTypes[keyof EventTypes];

export const getEvent = <F extends EventsFolderName, E extends keyof EventTypes>(
	folderName: F,
	eventName: EventName<F>,
	eventType: E,
): EventTypes[E] => {
	const eventRecord = EVENTS_REGISTRY[folderName][eventName as EventName<EventsFolderName>];
	if (eventRecord.type !== eventType) {
		error(`Event ${eventName} is a ${eventRecord.type}, but being used as ${eventType}`);
	}

	let eventsFolder = ReplicatedStorage.FindFirstChild(folderName);
	if (!eventsFolder) {
		eventsFolder = new Instance("Folder");
		eventsFolder.Name = folderName;
		eventsFolder.Parent = ReplicatedStorage;
	}

	let event = eventsFolder.FindFirstChild(eventName) as EventTypes[E] | undefined;
	if (!event) {
		event = new Instance(eventType);
		event.Name = eventName;
		event.Parent = eventsFolder;
	}
	return event;
};
