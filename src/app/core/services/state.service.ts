import { Service, signal } from '@angular/core';

@Service()
export class StateService {
    private readonly _isAudioPlaying = signal<boolean>(false);
    readonly isAudioPlaying = this._isAudioPlaying.asReadonly();
    setIsAudioPlaying(value: boolean) {
        this._isAudioPlaying.set(value);
    }
}