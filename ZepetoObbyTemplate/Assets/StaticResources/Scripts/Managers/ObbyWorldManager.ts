import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnPlatform from '../Platforms/SpawnPlatform';
import WorldState from './WorldState';

// This class controls the checkpoint system for the player
export default class ObbyWorldManager extends ZepetoScriptBehaviour {

    // Singleton instance variable
    public static instance: ObbyWorldManager;

    // Last saved checkpoint
    private _currentCheckpoint: SpawnPlatform;

    // Awake is called when the script instance is being loaded
    Awake() {

        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // Singleton https://docs.zepeto.me/studio/reference/singleton
        if (ObbyWorldManager.instance == null) {
            ObbyWorldManager.instance = this;
        } else {
            GameObject.Destroy(this);
        }
    }

    // Control when the player has fallen down and respawn him on the last checkpoint
    // Update is called every frame, if the MonoBehaviour is enabled
    Update() {

        // Check if the "zepetoCharacter" variable of the "WorldState" instance is not null
        if (WorldState.Instance.zepetoCharacter != null) {

            // Check if the positios of the "zepetoCharacter" is less than -20 on Y
            // Which means that the player has fallen from the platforms, if so
            if (WorldState.Instance.zepetoCharacter.transform.position.y < -20) {

                // We send the player to the position of "_currentCheckpoint" 
                WorldState.Instance.zepetoCharacter.transform.position = this._currentCheckpoint.transform.position;

                // Call to the internal method that teleports the player
                this.TeleportCharacter();
            }
        }
    }

    // This method updates the current checkpoint to one passed by parameter
    UpdateCheckpoint(newCheckpoint: SpawnPlatform) {
        // Here we set the reference of "_checkPoint"
        this._currentCheckpoint = newCheckpoint;
    }

    // Teleport the character to last checkpoint position
    TeleportCharacter() {

        // We make a call to the function of "zepetoCharacter" "teleport", passing both position and rotation as parameters
        WorldState.Instance.zepetoCharacter.Teleport(this._currentCheckpoint.transform.position, WorldState.Instance.zepetoCharacter.transform.rotation);
    }
}