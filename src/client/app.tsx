import React from "@rbxts/react";

export const App = () => {
	return (
		<React.Fragment>
			<frame
				BackgroundTransparency={0}
				Size={new UDim2(0.2, 0, 0.2, 0)}
				Position={new UDim2(0.4, 0, 0.4, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
			>
				<textlabel Position={new UDim2(0.5, 0, 0.5, 0)} Text={"Hello World"} />
			</frame>
		</React.Fragment>
	);
};
