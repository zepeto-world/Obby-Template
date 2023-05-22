import { Collider, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ObbyGameManager from './ObbyGameManager';
import GameSettings from './GameSettings';

export default class SpawnPoint extends ZepetoScriptBehaviour 
{

    public particleSystem: GameObject;
    private _activeCheckpoint: bool = false;
    private _obbyManager: GameObject;

    OnTriggerEnter(collider: Collider) {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        if (!this._activeCheckpoint) {
            this._activeCheckpoint = true;
            ObbyGameManager.instance.UpdateCheckpoint(this);
        }
    }
}