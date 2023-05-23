import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './Game Settings/GameSettings';
import ObbyGameManager from './Game Settings/ObbyGameManager';


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