import { TextMeshProUGUI } from 'TMPro';
import { Application } from 'UnityEngine';
import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class GameOverScreen extends ZepetoScriptBehaviour
{
    public gameOverTittle: string = "Game Over"; //Game Over Tittle
    public gameOverSubtittle: string = "Time is up!"; //Game Over Subtittle, It is not required

    public retryButton: Button; //Get retry button reference
    public tittleTxt: TextMeshProUGUI; //Get tittle reference
    public subtittleTxt: TextMeshProUGUI; //Get Subtittle reference

    OnValidate()
    {
        this.tittleTxt.text = this.gameOverTittle;
        this.subtittleTxt.text = this.gameOverSubtittle;
    }

    Start()
    {
        this.tittleTxt.text = this.gameOverTittle;
        this.subtittleTxt.text = this.gameOverSubtittle;

        this.retryButton.onClick.AddListener(this.RetryBtnAction);
    }

    RetryBtnAction(): void
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

}