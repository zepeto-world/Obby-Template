import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Time } from "UnityEngine";

export default class SimpleMove extends ZepetoScriptBehaviour {

    public movingTime: number = 1;
    public movingRangeY: number = 2;
    //public movingRangeX: number = 0; //Don't work in this version!
    //public movingRangeZ: number = 0; //Don't work in this version!
    private delta: number = 0;
    private movingFlag: boolean = true;

    Update()
    {
        this.delta += Time.deltaTime;
        if (this.delta >= this.movingTime)
        {
            this.delta = 0;
            this.movingFlag = !this.movingFlag;
        }

        if (this.movingFlag) {
            this.transform.Translate(0, this.movingRangeY * Time.deltaTime, 0);
        } else {
            this.transform.Translate(0, -1 * this.movingRangeY * Time.deltaTime, 0);
        }
    }

}