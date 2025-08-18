import React from "@rbxts/react";
import { Workspace } from "@rbxts/services";
import { WithChildren } from "client/models/global.models";
import theme from "client/ui/style/theme";
import { getRemainingProps } from "client/utils/get-remaining-props";
import { getResponsiveValue } from "client/utils/responsiveness";

export interface TypographyProps extends React.InstanceProps<TextLabel>, Partial<WithChildren> {
	borderThickness?: number;
	maxBorderThickness?: number;
	maxTextSize?: number;
	withBorder?: boolean;
	borderColor?: Color3;
	zIndex?: number;
}

const remainingPropsKeys = [
	"children",
	"withBorder",
	"borderColor",
	"borderThickness",
	"maxBorderThickness",
	"maxTextSize",
	"Font",
	"TextSize",
	"TextColor3",
	"BackgroundTransparency",
	"zIndex",
];

export function Typography(props: TypographyProps) {
	const children = props.children;
	const withBorder = props.withBorder;
	const borderColor = props.borderColor ?? theme.colors.gray[800];
	const maxTextSize = props.maxTextSize;
	const maxBorderThickness = props.maxBorderThickness;
	const baseBorderThickness = props.borderThickness ?? 6;
	const fontFamily = props.Font ?? theme.fontFamily.default;
	const baseTextSize = props.TextSize ?? theme.fontSize.heading;
	const textColor = props.TextColor3 ?? theme.colors.white;
	const backgroundTransparency = props.BackgroundTransparency ?? 1;
	const zIndex = props.zIndex ?? 1;

	const responsiveTextSize = getResponsiveValue(baseTextSize as number, 5, maxTextSize);
	const responsiveBorderThickness = getResponsiveValue(baseBorderThickness, 0, maxBorderThickness);

	const camera = Workspace.CurrentCamera;
	const isMobile = camera ? camera.ViewportSize.X < 1000 : false;

	return (
		<textlabel
			BackgroundTransparency={backgroundTransparency}
			Font={fontFamily}
			TextColor3={borderColor}
			TextSize={responsiveTextSize}
			ZIndex={zIndex}
			{...getRemainingProps<TypographyProps>(props, remainingPropsKeys)}
		>
			<textlabel
				BackgroundTransparency={1}
				Font={fontFamily}
				TextColor3={textColor}
				TextSize={responsiveTextSize}
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0, -1, 0, isMobile ? -1 : -3)}
				ZIndex={zIndex + 1}
				Text={props.Text || ""}
				TextXAlignment={props.TextXAlignment}
				TextYAlignment={props.TextYAlignment}
				TextScaled={props.TextScaled}
				TextWrapped={props.TextWrapped}
			>
				{children && children}

				{withBorder && (
					<uistroke
						Color={borderColor}
						LineJoinMode={Enum.LineJoinMode.Miter}
						Thickness={responsiveBorderThickness}
					/>
				)}
			</textlabel>

			{withBorder && (
				<uistroke
					Color={borderColor}
					LineJoinMode={Enum.LineJoinMode.Miter}
					Thickness={responsiveBorderThickness}
				/>
			)}
		</textlabel>
	);
}
