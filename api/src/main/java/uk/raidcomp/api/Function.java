package uk.raidcomp.api;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import io.micronaut.azure.function.http.AzureHttpFunction;
import java.util.Optional;

public class Function extends AzureHttpFunction {

  @FunctionName("MicronautRouter")
  public HttpResponseMessage invoke(
      @HttpTrigger(name = "req", methods = { HttpMethod.GET,
          HttpMethod.POST }, route = "{*route}", authLevel = AuthorizationLevel.FUNCTION) HttpRequestMessage<Optional<String>> request,
      final ExecutionContext context) {
    return super.route(request, context);
  }
}
