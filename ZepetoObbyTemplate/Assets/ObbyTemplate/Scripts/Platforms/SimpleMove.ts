import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Time } from "UnityEngine";

// This class controls the moving platforms
export default class SimpleMove extends ZepetoScriptBehaviour 
{
    public movingTime: number = 1; // How much time its tooks to move and go back

    // Set the amount of distance that will move towards each axis
    @Header("Direction")
    public movingRangeX: number = 2; // Amount of distance that the platform will move on X
    public movingRangeY: number = 2; // Amount of distance that the platform will move on Y
    public movingRangeZ: number = 2; // Amount of distance that the platform will move on Z

    private _delta: number = 0; // Controls the time
    private _movingFlag: boolean = true; // Flag for the move

    // Every second the platform moves toward the offset position setted on the variables
    // once the time is gapped them comes again to the start position
    // https://docs.unity3d.com/ScriptReference/MonoBehaviour.FixedUpdate.html
    FixedUpdate() 
    {
        // We count every second that is happen on the game and save it on "_delta"
        this._delta += Time.deltaTime;

        // Check if the amount of "_delta" is more or equal to "movingTime"
        if (this._delta >= this.movingTime) 
        {
            // Set "_delta" to zero
            this._delta = 0;

            // we set the variable _movingFlag to its value in reverse (if true then false - if false then true)
            this._movingFlag = !this._movingFlag;
        }

        // Check if "_movingFlag" is true or false
        if (this._movingFlag) 
        {
            // move the transform to its target position
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, this.movingRangeZ * Time.deltaTime);
        } 
        else 
        {
            // move the transform to its initial position
            this.transform.Translate(-this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, -this.movingRangeZ * Time.deltaTime);
        }
    }
}