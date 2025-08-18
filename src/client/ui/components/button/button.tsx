import React, { ReactNode, useEffect, useState } from "@rbxts/react";
import { TweenService } from "@rbxts/services";
import theme from "client/ui/style/theme";
import { getResponsiveValue } from "client/utils/responsiveness";
import { clickSound } from "client/utils/sounds";
import { Typography } from "client/ui/components/typography";

export interface ButtonProps {
	anchorPoint?: Vector2;
	aspectRatio?: number;
	backgroundColor?: Color3;
	borderColor?: Color3;
	borderThickness?: number;
	children?: ReactNode;
	clickScale?: number;
	cornerRadius?: number;
	disableAnimations?: boolean;
	hoverScale?: number;
	maxBorderThickness?: number;
	maxTextSize?: number;
	onClick?: () => void;
	padding?: number;
	position?: UDim2;
	size?: UDim2;
	text?: string;
	textColor?: Color3;
	textSize?: number;
	textStrokeColor3?: Color3;
	textStrokeTransparency?: number;
	withBorder?: boolean;
	zIndex?: number;
}

export function Button({
	anchorPoint = new Vector2(0.5, 0.5),
	aspectRatio = 2,
	backgroundColor = theme.colors.info,
	borderColor = theme.colors.black,
	borderThickness = 3,
	children,
	clickScale = 0.95,
	cornerRadius = 0.2,
	disableAnimations = false,
	hoverScale = 1.07,
	maxBorderThickness,
	maxTextSize,
	onClick,
	padding = 0.05,
	position = new UDim2(0.5, 0, 0.5, 0),
	size = new UDim2(1, 0, 1, 0),
	text = "",
	textColor = theme.colors.white,
	textSize = theme.fontSize.button,
	withBorder = true,
	zIndex = 1,
}: ButtonProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);
	const [scaleRef, setScaleRef] = useState<UIScale>();

	const responsiveTextSize = getResponsiveValue(textSize, 5, maxTextSize);
	const responsiveBorderThickness = getResponsiveValue(borderThickness, 0, maxBorderThickness);

	useEffect(() => {
		if (!scaleRef || disableAnimations) return;

		const targetScale = isPressed ? clickScale : isHovered ? hoverScale : 1;
		const tween = TweenService.Create(scaleRef, new TweenInfo(0.05), { Scale: targetScale });
		tween.Play();

		return () => tween.Cancel();
	}, [isHovered, scaleRef, isPressed]);

	return (
		<frame
			AnchorPoint={anchorPoint}
			BackgroundColor3={backgroundColor}
			BackgroundTransparency={0}
			Position={position}
			Size={size}
			ZIndex={zIndex}
		>
			<uiscale ref={setScaleRef} Scale={1} />

			<uiaspectratioconstraint AspectRatio={aspectRatio} />

			<uicorner CornerRadius={new UDim(cornerRadius, 0)} />

			{withBorder && <uistroke Color={borderColor} Thickness={responsiveBorderThickness} />}

			<frame Position={new UDim2(0, 0, 0, 0)} Size={new UDim2(1, 0, 1, 0)}>
				<uicorner CornerRadius={new UDim(0.2, 0)} />

				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, Color3.fromHex("#000000")),
							new ColorSequenceKeypoint(1, Color3.fromHex("#818181")),
						])
					}
					Rotation={90}
					Transparency={
						new NumberSequence([
							new NumberSequenceKeypoint(0, 1),
							new NumberSequenceKeypoint(0.1, 1),
							new NumberSequenceKeypoint(0.8, 1),
							new NumberSequenceKeypoint(1, 0.7),
						])
					}
				/>
			</frame>

			<textbutton
				BackgroundTransparency={1}
				Event={{
					MouseButton1Click: () => {
						clickSound.Play();
						onClick?.();
					},
					MouseButton1Down: () => setIsPressed(true),
					MouseButton1Up: () => setIsPressed(false),
					MouseEnter: () => setIsHovered(true),
					MouseLeave: () => {
						setIsHovered(false);
						setIsPressed(false);
					},
				}}
				Text=""
				Font={Enum.Font.FredokaOne}
				Size={new UDim2(1, 0, 1, 0)}
			>
				<Typography
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, 0, 0.04, 0)}
					BackgroundTransparency={1}
					Text={text}
					TextColor3={textColor}
					TextSize={textSize}
					borderThickness={3.5}
					withBorder
				/>

				<uipadding
					PaddingBottom={new UDim(padding, 0)}
					PaddingLeft={new UDim(padding * 2, 0)}
					PaddingRight={new UDim(padding * 2, 0)}
					PaddingTop={new UDim(padding, 0)}
				/>

				{children}
			</textbutton>
		</frame>
	);
}
