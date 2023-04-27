import { Collider, Debug, GameObject, Quaternion, Transform, Vector3 } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ObbyGameManager from './ObbyGameManager';
import GameSettings from './GameSettings';

export default class Teleport extends ZepetoScriptBehaviour
{
    OnTriggerEnter(collider: Collider)
    {
        if (GameSettings.instance.zepetoCharacter == null || collider.gameObject != GameSettings.instance.zepetoCharacter.gameObject)
            return;

        this.TPPlayer();
    }

    TPPlayer()
    {
        ObbyGameManager.instance.TeleportCharacter();
    }
}