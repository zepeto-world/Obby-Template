import { Collider, Debug, GameObject, Quaternion, Transform, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import ObbyGameManager from './ObbyGameManager';
import GameSettings from './GameSettings';

export default class SpawnPoint extends ZepetoScriptBehaviour {

    public particleSystem: GameObject;
    private activeCheckpoint: bool = false;
    private obbyManager: GameObject;

    OnTriggerEnter(collider: Collider)
    {
        if (GameSettings.instance.zepetoCharacter == null || collider.gameObject != GameSettings.instance.zepetoCharacter.gameObject)
            return;

        if (!this.activeCheckpoint)
        {
            this.activeCheckpoint = true;
            ObbyGameManager.instance.UpdateCheckpoint(this);
        }
    }

}