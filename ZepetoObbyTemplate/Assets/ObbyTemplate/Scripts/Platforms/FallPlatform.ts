import { BoxCollider, Collider, Quaternion, Rigidbody, Vector3 } from "UnityEngine";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameState from "../Managers/GameState";

// This class  controls the platforms that can fall when the player steps inside
export default class FallPlatform extends ZepetoScriptBehaviour 
{
  public fallDelay: number = 0.5; // Time it takes to start falling
  public respawnDelay: number = 3; // Time it takes to respawn

  private _falling: boolean; // Check it is falling
  private _initPos: Vector3; // Starting position

  private _myRigidbody: Rigidbody; // Rigidbody Reference
  private _myCollider: BoxCollider; // BoxCollider Reference

  // Awake is called when the script instance is being loaded
  Awake () 
  {
    // Get the Collider reference on this GameObject
    this._myCollider = this.gameObject.GetComponent<BoxCollider>();

    // Get the Rigidbody reference on this GameObject
    this._myRigidbody = this.gameObject.GetComponent<Rigidbody>();
  }

  // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
  Start () 
  {
    // Check if the amount of childs of "transform" is more than 0
    if ( this.transform.childCount > 0 )
    {
      // DEV NOTE:
      // The FallPlataform is an empty object with a collider and a rigidbody, 
      // it takes its dimensions based on the collider of the first child it has in its hierarchy
      // It is important to remember that the child of this object must have a BoxCollider

      // We create a reference to the BoxCollider of child 0
      let child: BoxCollider = this.transform.GetChild( 0 ).GetComponent<BoxCollider>();

      // Rebuild Center of this collider from the child center
      this._myCollider.center = new Vector3( child.center.x, 0.5, child.center.z );

      // Rebuild Size of this collider from the child size
      this._myCollider.size = new Vector3( child.transform.localScale.x * child.size.x, 1, child.transform.localScale.z * child.size.z );

      // Set this "isTrigger" property on true
      this._myCollider.isTrigger = true;
    }

    // We save the initial position of the platform
    this._initPos = this.transform.position;
  }

  // If the platform detects the collision with the player, it calls the method to fall
  // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
  OnTriggerEnter ( collider: Collider ) 
  {
    // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
    if ( GameState.Instance.zepetoCharacter == null || collider.gameObject != GameState.Instance.zepetoCharacter.gameObject )
      return;

    // Check if the internal variable "_falling" is false
    if ( !this._falling )
    {
      // Set the internal variable "_falling" on true
      this._falling = true;
      
      // We call the internal function "FallPlatform" after a delay set in the variable "fallDelay" 
      this.Invoke( "FallPlatform", this.fallDelay );
      
      // DEV NOTE: 
      // Using an Invoke instead of a direct call, allows us to add a delay for its execution
    }
  }

  // This method causes the platform to start falling
  FallPlatform () 
  {
    // First we change the "isKinematic" property on false
    this._myRigidbody.isKinematic = false;

    // Then we activate the "useGravity" for fall
    this._myRigidbody.useGravity = true;

    // We call the internal function "RespawnPlatform" after a delay set in the variable "respawnDelay" 
    this.Invoke( "RespawnPlatform", this.respawnDelay );
  }

  // This method is responsible for returning the platform to its initial state
  RespawnPlatform () 
  {
    // We set the flag of is falling on false
    this._falling = false;

    // Reset the kinematic and the gravity, doing that the platform will not fall when it respawns
    this._myRigidbody.isKinematic = true;

    // Deactivate the "useGravity" to prevent the move
    this._myRigidbody.useGravity = false;

    // Set the rotation of the transform to zero
    this.transform.rotation = Quaternion.Euler( 0, 0, 0 );

    // Set the position into the exact same position at start
    this.transform.position = this._initPos; 
  }
}
