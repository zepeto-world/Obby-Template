import { Collider, Coroutine, Quaternion, Vector3, WaitForSeconds } from "UnityEngine";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import WorldState from "../Managers/WorldState";

// This class represents a platform that can fall and respawn
export default class FallPlatform extends ZepetoScriptBehaviour {

  // Public variable to set the delay before the platform starts falling
  public fallDelay: number = 1;

  //Public variable that sets the delay before the platform respawns after the player touches it
  public respawnDelay: number = 3;

  // Private variable to track whether the platform is currently falling
  private _falling: boolean;

  // Private variable to store the platform's initial position
  private _initPos: Vector3;

  // Coroutine variable for managing the fall and respawn sequences
  private _coFallPlatform: Coroutine;

  // Called once at the start when the script is enabled, to initialize variables
  Start() {

    // Store the initial position of the platform for respawning purposes
    this._initPos = this.transform.position;
  }

  // If the platform detects the collision with the player, it calls the method to fall
  // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
  OnTriggerEnter(collider: Collider) {

    if(this.respawnDelay == 0){
      this.respawnDelay = 0.25;
    }

    // Check if the "zepetoCharacter" of the WorldSettings instance is null or if the gameobject of the collider is not him and return
    if (WorldState.Instance.zepetoCharacter == null || collider.gameObject != WorldState.Instance.zepetoCharacter.gameObject)
      return;

    // If the platform is not already falling, start the falling and respawning coroutines
    if (!this._falling && this._coFallPlatform == null) {

      // Mark the platform as falling
      this._falling = true;

      // Start the coroutine to make the platform fall
      this._coFallPlatform = this.StartCoroutine(this.CoFallPlatform());

      // Start the coroutine to respawn the platform after it falls
      this.StartCoroutine(this.CoRespawnPlatform());
    }

  }

  // Coroutine to handle the platform's falling behavior
  *CoFallPlatform() {

    // Wait for the specified fall delay
    yield new WaitForSeconds(this.fallDelay);

    // Continue falling until the falling condition is false
    while (this._falling) {

      // Move the platform downwards
      this.transform.Translate(0, -0.5, 0);

      // Yield control back to the engine until the next frame
      yield null;
    }
  }

  // Coroutine to respawn the platform to its initial position
  *CoRespawnPlatform() {

    // Wait for the specified respawn delay
    yield new WaitForSeconds(this.fallDelay + this.respawnDelay);

    // Reset the falling flag
    this._falling = false;

    // Reset the platform's rotation to its original state
    this.transform.rotation = Quaternion.Euler(0, 0, 0);

    // Reset the platform's position to its initial state
    this.transform.position = this._initPos;

    // Clear the coroutine variable
    this._coFallPlatform = null;
  }

}