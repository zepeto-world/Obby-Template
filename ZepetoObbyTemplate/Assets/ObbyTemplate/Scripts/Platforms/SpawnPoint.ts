import { Collider, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameState from "../Managers/GameState";
import ObbyGameManager from '../Managers/ObbyGameManager';

// This class controls the spawnpoints
export default class SpawnPoint extends ZepetoScriptBehaviour 
{
    public particleSystem: GameObject; // Particles System reference
    private _activeCheckpoint: bool = false; // Internal flag to set if the spawnpoint was actived

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    // When the player touches the spawn it got setted active and update the last checkpoint
    OnTriggerEnter(collider: Collider) 
    {
        // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
        if (GameState.Instance.zepetoCharacter == null || collider.gameObject != GameState.Instance.zepetoCharacter.gameObject)
            return;
        
        // Check if the flag is false
        if (!this._activeCheckpoint) 
        {
            // Set the flag on true
            this._activeCheckpoint = true;

            // Call to the UpdateCheckpoint method of the "ObbyGameManager" instance passing this "SpawnPoint" like reference
            ObbyGameManager.instance.UpdateCheckpoint(this);
        }
    }
}