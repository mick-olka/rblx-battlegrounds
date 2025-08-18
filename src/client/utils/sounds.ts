import { CollectionService, SoundService } from '@rbxts/services';
import { SFX_VOLUME, SOUND_TYPE } from './settings';

export const clickSound = new Instance('Sound');
clickSound.SoundId = 'rbxassetid://500472891';
clickSound.Volume = SFX_VOLUME;
clickSound.Parent = SoundService;
CollectionService.AddTag(clickSound, SOUND_TYPE.SFX);

export const collectSound = new Instance('Sound');
collectSound.SoundId = 'rbxassetid://94094864610677';
collectSound.Volume = SFX_VOLUME;
collectSound.Parent = SoundService;
CollectionService.AddTag(collectSound, SOUND_TYPE.SFX);

export const buySound = new Instance('Sound');
buySound.SoundId = 'rbxassetid://77333571765905';
buySound.Volume = SFX_VOLUME;
buySound.Parent = SoundService;
CollectionService.AddTag(buySound, SOUND_TYPE.SFX);

export const lasersSound = new Instance('Sound');
lasersSound.SoundId = 'rbxassetid://99016421337874';
lasersSound.Volume = SFX_VOLUME;
lasersSound.Parent = SoundService;
CollectionService.AddTag(lasersSound, SOUND_TYPE.SFX);

export const stealSound = new Instance('Sound');
stealSound.SoundId = 'rbxassetid://8853003751';
stealSound.Volume = SFX_VOLUME;
stealSound.Parent = SoundService;
stealSound.TimePosition = 2.8;
CollectionService.AddTag(stealSound, SOUND_TYPE.SFX);

export const successSound = new Instance('Sound');
successSound.SoundId = 'rbxassetid://3997124966';
successSound.Volume = SFX_VOLUME;
successSound.Parent = SoundService;
CollectionService.AddTag(successSound, SOUND_TYPE.SFX);
