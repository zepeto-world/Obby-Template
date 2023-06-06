import { GameObject, ParticleSystem } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameState from './GameState';
import SpawnPoint from '../Platforms/SpawnPoint';

// This class controls the checkpoint system for the player
export default class ObbyGameManager extends ZepetoScriptBehaviour 
{
    public static instance: ObbyGameManager; // Singleton instance variable

    public lobbyCamera: GameObject; // The reference to the mainCamera

    private _currentCheckpoint: SpawnPoint; // Last saved checkpoint

    // Awake is called when the script instance is being loaded
    Awake () 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // Singleton https://en.wikipedia.org/wiki/Singleton_pattern
        if ( ObbyGameManager.instance == null ) ObbyGameManager.instance = this;
        else GameObject.Destroy( this );

        // A the start we active the mainCamera/lobbyCamera
        this.lobbyCamera.gameObject.SetActive(true);
    }

    // Control when the player has fallen down and respawn him on the last checkpoint
    // Update is called every frame, if the MonoBehaviour is enabled
    Update () 
    {
        // Check if the "zepetoCharacter" variable of the "GameState" instance is not null
        if ( GameState.Instance.zepetoCharacter != null )
        {
            // Check if the positios of the "zepetoCharacter" is less than -20 on Y
            // Which means that the player has fallen from the platforms, if so
            if ( GameState.Instance.zepetoCharacter.transform.position.y < -20 )
            {
                // We send the player to the position of "_currentCheckpoint" 
                GameState.Instance.zepetoCharacter.transform.position = this._currentCheckpoint.transform.position;

                // Call to the internal method that teleports the player
                this.TeleportCharacter();
            }
        }
    }

    // This method updates the current checkpoint to one passed by parameter
    UpdateCheckpoint ( newCheckpoint: SpawnPoint ) 
    {
        // Here we set the reference of "_checkPoint"
        this._currentCheckpoint = newCheckpoint;
    }

    // Teleport the character to last checkpoint position
    TeleportCharacter () 
    {
        // We make a call to the function of "zepetoCharacter" "teleport", passing both position and rotation as parameters
        GameState.Instance.zepetoCharacter.Teleport( this._currentCheckpoint.transform.position, GameState.Instance.zepetoCharacter.transform.rotation );

        // Here we get the particle System of the "_currentCheckpoint" gameobject and make it emit 10 particles
        this._currentCheckpoint.particleSystem.GetComponent<ParticleSystem>().Emit( 10 );
    }
}