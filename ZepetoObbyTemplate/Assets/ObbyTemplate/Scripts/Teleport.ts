import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameState from './Managers/GameState';
import ObbyGameManager from './Managers/ObbyGameManager';

// This class is responsible for manipulating the position of the player
export default class Teleport extends ZepetoScriptBehaviour 
{

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    OnTriggerEnter ( collider: Collider ) 
    {
        // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
        // If so, return the function
        if ( GameState.Instance.zepetoCharacter == null || collider.gameObject != GameState.Instance.zepetoCharacter.gameObject )
            return;

        // Call to the internal function "TPPlayer"
        this.TPPlayer();
    }

    // This method teleport the player
    TPPlayer () 
    {
        // Call to the "TeleportCharacter" function of the ObbyGameManager instance
        ObbyGameManager.instance.TeleportCharacter();
    }
}