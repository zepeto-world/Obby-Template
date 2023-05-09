import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ObbyGameManager from './ObbyGameManager';
import GameSettings from './GameSettings';

export default class Teleport extends ZepetoScriptBehaviour
{
    OnTriggerEnter(collider: Collider)
    {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        this.TPPlayer();
    }

    TPPlayer()
    {
        ObbyGameManager.instance.TeleportCharacter();
    }
}