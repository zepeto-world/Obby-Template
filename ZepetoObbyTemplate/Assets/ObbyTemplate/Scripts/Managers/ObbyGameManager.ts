import { GameObject, ParticleSystem } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';
import SpawnPoint from '../Platforms/SpawnPoint';

// This class controls the checkpoint system for the player
export default class ObbyGameManager extends ZepetoScriptBehaviour {
    public static instance: ObbyGameManager; // Singleton instance variable

    private _currentCheckpoint: SpawnPoint; //Last saved checkpoint

    Awake () {
        //Singleton
        if ( ObbyGameManager.instance == null ) ObbyGameManager.instance = this;
        else GameObject.Destroy( this );

    }

    //  Control when the player has fallen down and respawn him on the last checkpoint
    Update () {
        if ( GameSettings.Instance.zepetoCharacter != null )
        {
            if ( GameSettings.Instance.zepetoCharacter.transform.position.y < -20 )
            {
                GameSettings.Instance.zepetoCharacter.transform.position = this._currentCheckpoint.transform.position;
                this.TeleportCharacter();
                return;
            }
        }
    }

    /// Save new checkpoint
    UpdateCheckpoint ( newCheckpoint: SpawnPoint ) {
        this._currentCheckpoint = newCheckpoint;
    }

    /// Teleport the character to last checkpoint position
    TeleportCharacter () {
        //  Teleports the player with certain rotation and plays a vfx
        GameSettings.Instance.zepetoCharacter.Teleport( this._currentCheckpoint.transform.position, GameSettings.Instance.zepetoCharacter.transform.rotation ); 
        this._currentCheckpoint.particleSystem.GetComponent<ParticleSystem>().Emit( 10 );
    }
}