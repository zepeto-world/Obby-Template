import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoCharacter, ZepetoPlayers, UIZepetoPlayerControl } from 'ZEPETO.Character.Controller'
import { SceneManager } from 'UnityEngine.SceneManagement';
import UIManager from './UIManager';
import { WorldService } from 'ZEPETO.World';

// This class set up the world levels and controls if the player wins or loses
export default class WorldState extends ZepetoScriptBehaviour {

    // Singleton instance variable
    public static Instance: WorldState;

    // Set if the collision with the goal will trigger the win
    @HideInInspector() public canWin: bool;

    // Reference of Zepeto Character
    @HideInInspector() public zepetoCharacter: ZepetoCharacter;

    // Controls if the player is already on world
    private _playerSpawned: bool;

    // Reference to the UIZepetoPlayerControl to restrict the use when you are in the world
    private controlUI: UIZepetoPlayerControl;

    // Awake is called when the script instance is being loaded
    Awake() {

        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (WorldState.Instance == null) {
            WorldState.Instance = this;
        } else {
            GameObject.Destroy(this);
        }
    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() {

        // Call to the start UI 
        UIManager.Instance.OnStart();

        this.OnWorldStart();
    }

    // This method is responsible for spawning the player
    SpawnPlayer() {

        // Set the internal player spawn flag to true
        this._playerSpawned = true;

        // Instance of the player zepeto
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);

        // The instantiation can take a few seconds, the following lines are executed once this happens
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {

            // We save the reference of the ZepetoCharacter
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;

            // Find a object with the type of UIZepetoPlayerControl and set it on the variable
            this.controlUI = GameObject.FindObjectOfType<UIZepetoPlayerControl>();
        });
    }

    // This method resets the world state
    ResetGameVariables(): void {

        // Set to false the internal flag "canWin"
        this.canWin = false;
    }

    // This method is responsible for resetting the level
    ResetMap() {

        // We reload the scene
        // https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    // This method is called when player starts the world
    OnWorldStart(): void {

        // If this player is not generated, we call the respective method
        if (!this._playerSpawned) {
            this.SpawnPlayer();
        }

        // Finally we set the internal flag that it is possible to win
        this.canWin = true;

        // Enable player control
        this.ControlPlayer(true);
    }

    // This method is called when the player wins
    OnWorldEnd(): void {

        // Calling the same event in the UIManagers
        UIManager.Instance.OnEndWorld();

        // We call the internal method that resets the world variables
        this.ResetGameVariables();

        // Disable player control when the player wins
        this.ControlPlayer(false);
    }

    // This function active or deactive the control of the player
    public ControlPlayer(activePlayer: bool) {

        // If the controlUI is not null, deactivate the object
        this.controlUI?.gameObject.SetActive(activePlayer);

        // Check if the player have to be active and set the camera sensitivity on 5 or 0 
        if (activePlayer) {
            ZepetoPlayers.instance.cameraData.zoomDampSpeed = 5;
        } else {
            ZepetoPlayers.instance.cameraData.zoomDampSpeed = 0;
        }
    }
}