using System.Threading.Tasks;
using UnityEngine;
using ZEPETO.Script.Build;
using TemplateAnalytics;
using ZEPETO.World.Editor;

[ZepetoScriptBuildTask(10000)]
public class CustomBuildTask : ZepetoScriptBuildTask
{
    public override Task Run()
    {
        GameObject tempObject = new GameObject("TemporaryUserAnalytics");
        UserAnalyticsMonoBehaviour userAnalyticsMonoBehaviour = tempObject.AddComponent<UserAnalyticsMonoBehaviour>();
        userAnalyticsMonoBehaviour.SendAnalytics(tempObject);
        GameObject.DestroyImmediate(tempObject);
        return Task.CompletedTask;
    }
}

public class UserAnalyticsMonoBehaviour : MonoBehaviour
{
    public void SendAnalytics(GameObject tempGameObject)
    {
        string templateId = "obby";
        string userId = WorldEditorSettings.instance.User.userId;
        string worldId = WorldPlayerSettings.instance.worldId;

        UserActivityReporter reporter = new UserActivityReporter();
        StartCoroutine(reporter.CoSendAnalytics(templateId, worldId, userId));
    }
}