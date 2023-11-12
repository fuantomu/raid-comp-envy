package uk.raidcomp.api;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import com.microsoft.azure.functions.annotation.TimerTrigger;
import io.micronaut.azure.function.http.AzureHttpFunction;
import jakarta.inject.Inject;
import java.util.Optional;
import uk.raidcomp.api.delegate.BuildDelegate;

import static uk.raidcomp.api.delegate.BuildDelegate.PRUNE_SCHEDULE_CRON;

public class Function extends AzureHttpFunction {
  @Inject private BuildDelegate buildDelegate;

  @FunctionName("MicronautRouter")
  public HttpResponseMessage invoke(
      @HttpTrigger(
              name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              route = "{*route}",
              authLevel = AuthorizationLevel.FUNCTION)
          HttpRequestMessage<Optional<String>> request,
      final ExecutionContext context) {
    return super.route(request, context);
  }

  @FunctionName("DeleteOldBuilds")
  public void keepAlive(
      @TimerTrigger(name = "deleteOldBuilds", schedule = PRUNE_SCHEDULE_CRON) String timerInfo,
      ExecutionContext context) {
    context.getLogger().info("Pruning old builds...");
    final long buildsDeleted = buildDelegate.deleteOldBuilds();
    if (buildsDeleted > 0) {
      context.getLogger().info("Pruned %s records".formatted(buildsDeleted));
    }
  }
}
