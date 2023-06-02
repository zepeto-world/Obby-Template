import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from "../Managers/GameSettings";

// This class controls the goal, when the player touch the goal
export default class Goal extends ZepetoScriptBehaviour 
{

    private _used: boolean; // Control if the player already touched this

    // When the player touches call to the win and set the flag on true
    OnTriggerEnter(collider: Collider) {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        if (!this._used && GameSettings.Instance.canWin) {
            GameSettings.Instance.OnVictory();
            this._used = true;
        }
    }
}