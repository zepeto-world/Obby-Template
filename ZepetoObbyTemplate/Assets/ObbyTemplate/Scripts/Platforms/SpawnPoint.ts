import { Collider, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from "../Managers/GameSettings";
import ObbyGameManager from '../Managers/ObbyGameManager';

// This class controls the spawnpoints
export default class SpawnPoint extends ZepetoScriptBehaviour 
{
    public particleSystem: GameObject; // Particles 
    private _activeCheckpoint: bool = false; // flag to set if the spawnpoint was actived

    // When the player touches the spawn it got setted active and update the last checkpoint
    OnTriggerEnter(collider: Collider) {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        if (!this._activeCheckpoint) {
            this._activeCheckpoint = true;
            ObbyGameManager.instance.UpdateCheckpoint(this);
        }
    }
}