import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class Goal extends ZepetoScriptBehaviour 
{

    private _used: boolean;

    OnTriggerEnter(collider: Collider) {
        if (GameSettings.Instance.zepetoCharacter == null || collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject)
            return;

        if (!this._used && GameSettings.Instance.canWin) {
            GameSettings.Instance.OnVictory();
            this._used = true;
        }
    }
}