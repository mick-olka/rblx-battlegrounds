import React from "@rbxts/react";
import { Button } from "./components";
// import theme from "./style/theme";
import { getEvent } from "shared/events";
import { Window } from "./game-window";

export const App = () => {
	const [windowOpened, setWindowOpened] = React.useState(true);

	const openTable = () => {
		setWindowOpened(true);
		getEvent("Player", "PlayerMovementDisableRE", "RemoteEvent").FireServer();
	};

	const closeTable = () => {
		setWindowOpened(false);
		getEvent("Player", "PlayerMovementEnableRE", "RemoteEvent").FireServer();
	};

	const toggleTable = () => {
		if (windowOpened) {
			closeTable();
		} else {
			openTable();
		}
	};

	return (
		<React.Fragment>
			<Window opened={windowOpened} />
			<Button
				size={new UDim2(0.1, 0, 0.1, 0)}
				position={new UDim2(0.05, 0, 0.9, 0)}
				text={windowOpened ? "Close Table" : "Open Table"}
				onClick={toggleTable}
			/>
		</React.Fragment>
	);
};
