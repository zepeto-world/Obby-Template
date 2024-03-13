import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Time } from "UnityEngine";

// This class controls the moving platforms
export default class MovingPlatform extends ZepetoScriptBehaviour {

    // How much time its tooks to move and go back
    public movingTime: number = 1;

    @Header("Direction")
    // Amount of distance that the platform will move on X
    public movingRangeX: number = 2;

    // Amount of distance that the platform will move on Y
    public movingRangeY: number = 2;

    // Amount of distance that the platform will move on Z
    public movingRangeZ: number = 2;

    // Controls the time
    private _delta: number = 0;

    // Flag for the move
    private _movingFlag: boolean = true;

    // Every second the platform moves toward the offset position setted on the variables
    // Once the time is gapped them comes again to the start position
    // https://docs.unity3d.com/ScriptReference/MonoBehaviour.FixedUpdate.html
    FixedUpdate() {

        // We count every second that is happen on the world and save it on "_delta"
        this._delta += Time.deltaTime;

        // Check if the amount of "_delta" is more or equal to "movingTime"
        if (this._delta >= this.movingTime) {

            // Set "_delta" to zero
            this._delta = 0;

            // We set the variable _movingFlag to its value in reverse (if true then false - if false then true)
            this._movingFlag = !this._movingFlag;
        }

        // Check if "_movingFlag" is true or false
        if (this._movingFlag) {

            // Move the transform to its target position
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, this.movingRangeZ * Time.deltaTime);
        }
        else {

            // Move the transform to its initial position
            this.transform.Translate(-this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, -this.movingRangeZ * Time.deltaTime);
        }
    }
}