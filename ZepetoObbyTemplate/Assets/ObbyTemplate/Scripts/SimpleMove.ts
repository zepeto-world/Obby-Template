import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { CharacterController, Collider, Time, Transform } from "UnityEngine";
import { CharacterState, ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';
export default class SimpleMove extends ZepetoScriptBehaviour {
    public movingTime: number = 1;

    @Header("Direction")
    public movingRangeY: number = 2;
    public movingRangeX: number = 2;
    public movingRangeZ: number = 2;
    //public movingRangeX: number = 0; //Don't work in this version!
    //public movingRangeZ: number = 0; //Don't work in this version!
    private delta: number = 0;
    private movingFlag: boolean = true;

    FixedUpdate() {
        this.delta += Time.deltaTime;
        
        if (this.delta >= this.movingTime) {
            this.delta = 0;
            this.movingFlag = !this.movingFlag;
        }

        if (this.movingFlag) {
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, this.movingRangeZ * Time.deltaTime);
        } else {
            this.transform.Translate(-this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, -this.movingRangeZ * Time.deltaTime);
        }
    }
}