import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Time } from "UnityEngine";

// This class controls the moving platforms
export default class SimpleMove extends ZepetoScriptBehaviour 
{
    public movingTime: number = 1; // How much time its tooks to move and go back

    // Set the amount of distance that will move towards each axis
    @Header("Direction")
    public movingRangeY: number = 2;
    public movingRangeX: number = 2;
    public movingRangeZ: number = 2;

    private _delta: number = 0; // Controls the time
    private _movingFlag: boolean = true; // Flag for the move

    // Every second the platform moves toward the offset position setted on the variables
    // once the time is gapped them comes  again to the start position
    FixedUpdate() {
        this._delta += Time.deltaTime;

        if (this._delta >= this.movingTime) {
            this._delta = 0;
            this._movingFlag = !this._movingFlag;
        }

        if (this._movingFlag) {
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, this.movingRangeZ * Time.deltaTime);
        } else {
            this.transform.Translate(-this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, -this.movingRangeZ * Time.deltaTime);
        }
    }
}