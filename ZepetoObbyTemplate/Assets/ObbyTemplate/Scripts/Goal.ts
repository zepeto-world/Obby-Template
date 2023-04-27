import { Collider } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class Goal extends ZepetoScriptBehaviour {

    OnTriggerEnter(collider: Collider)
    {
        if (GameSettings.instance.zepetoCharacter == null || collider.gameObject != GameSettings.instance.zepetoCharacter.gameObject)
            return;

        GameSettings.instance.OnVictory();
    }
}