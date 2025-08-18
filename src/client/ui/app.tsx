import React from "@rbxts/react";
import { Button } from "./components";
import { ReplicatedStorage, TweenService } from "@rbxts/services";
import theme from "./style/theme";
import { getEvent } from "shared/events";

// const enableMovement = ReplicatedStorage.EnableMovement;

const Window = ({ opened }: { opened: boolean }) => {
	const tableRef = React.useRef<Frame>();

	React.useEffect(() => {
		if (tableRef.current) {
			const targetPosition = new UDim2(0.01, 0, opened ? -0.1 : 1, 0);
			const tween = TweenService.Create(
				tableRef.current,
				new TweenInfo(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
				{ Position: targetPosition },
			);

			tween.Play();
		}
	}, [opened]);

	return (
		<frame
			ref={tableRef}
			BackgroundTransparency={0.1}
			Size={new UDim2(0.98, 0, 1.09, 0)}
			Position={new UDim2(0.01, 0, 1, 0)}
			BackgroundColor3={new Color3(0.4, 0.4, 0.4)}
			BorderSizePixel={3}
			BorderColor3={new Color3(1, 1, 1)}
		>
			<textlabel
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Text={"Tavern"}
				TextColor3={new Color3(1, 1, 1)}
				TextSize={24}
			/>
		</frame>
	);
};

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
