import { TextMeshProUGUI } from 'TMPro';
import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class GameOverScreen extends ZepetoScriptBehaviour 
{
    public retryButton: Button; //Get retry button reference

    Start() {
        this.retryButton.onClick.AddListener(this.RetryBtnAction);
    }

    RetryBtnAction(): void {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}