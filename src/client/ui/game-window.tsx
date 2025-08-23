import React from "@rbxts/react";
import { TweenService } from "@rbxts/services";

export const Window = ({ opened }: { opened: boolean }) => {
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
