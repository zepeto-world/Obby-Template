import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './Managers/GameSettings';
import ObbyGameManager from './Managers/ObbyGameManager';

// Controls the teleport system
export default class Teleport extends ZepetoScriptBehaviour
{
    OnTriggerEnter(collider: Collider)
    {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        this.TPPlayer();
    }

    // Teleport the player
    TPPlayer()
    {
        ObbyGameManager.instance.TeleportCharacter();
    }
}