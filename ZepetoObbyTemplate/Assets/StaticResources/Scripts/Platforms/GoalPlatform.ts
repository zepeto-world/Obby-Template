import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import WorldState from "../Managers/WorldState";

// This class is in charge of reacting when reaching the final platform
export default class GoalPlatform extends ZepetoScriptBehaviour {

    // Control if the player already touched this
    private _used: boolean; 

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    // This event fires when the player reaches the last platform
    OnTriggerEnter(collider: Collider) {

        // Check if the "zepetoCharacter" of the WorldState instance is null or if the gameobject of the collider is not him and return
        if (WorldState.Instance.zepetoCharacter == null || collider.gameObject != WorldState.Instance.zepetoCharacter.gameObject)
            return;

        // Check if the flag "canWin" of the instance of WorldState is false
        if (!this._used && WorldState.Instance.canWin) {
            
            // We call to "OnWorldEnd" method of the WorldState instance
            WorldState.Instance.OnWorldEnd();

            // And set the flag "_used" on true
            this._used = true;
        }
    }
}