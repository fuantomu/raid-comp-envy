package uk.raidcomp.sql;

import io.micronaut.runtime.http.scope.RequestScope;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CurrentTimestamp;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.oracle.truffle.api.utilities.JSONHelper.JSONObjectBuilder;

import uk.raidcomp.api.controller.dto.PlayerDto;
import uk.raidcomp.api.controller.dto.imports.ImportRosterDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;

import java.sql.*;

@RequestScope
public class SqlHelperDelegate {

  public SqlHelperDelegate(final BuildDelegate buildDelegate) {
  }

    public List<PlayerDto> getRoster(ImportRosterDto connectionString) {
      final List<PlayerDto> teams = new ArrayList<>();

      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());
        String query = "SELECT * from `"+connectionString.table()+"`";
        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while(result.next()){
          System.out.println(result.getMetaData());
          PlayerDto p = new PlayerDto(result.getString("name"), null, WarcraftPlayerClass.findByValue(result.getString("class")), WarcraftPlayerSpec.findByValue(result.getString("spec"),result.getString("class")), InviteStatus.UNKNOWN, null);
          teams.add(p);
        }
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return teams;
  }


  public Integer saveBuild(SaveBuildDto connectionString) {
      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());

        JsonArray playerJSON = new JsonArray();

        for(PlayerDto test : connectionString.players()){
          JsonObject tempJson = new JsonObject();
          tempJson.addProperty("name", test.name());
          tempJson.addProperty("realm", test.realm());
          tempJson.addProperty("className", test.className().name());
          tempJson.addProperty("spec", test.spec().name());
          tempJson.addProperty("status", test.status().name());
          tempJson.addProperty("group", test.group().name());
          playerJSON.add(tempJson);
        }
        String query = "REPLACE INTO `"+connectionString.table()+"` (id, lastSeen, name, players) VALUES (?,?,?,?)";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setString(1, "Build");
        statement.setLong(2, new java.util.Date().getTime());
        statement.setString(3, "currentBuild");
        statement.setString(4, playerJSON.toString());

        statement.execute();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return connectionString.players().size();
  }

  public String loadBuild(LoadBuildDto connectionString) {
      String players = "";

      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());
        String query = "SELECT * from `"+connectionString.table()+"` WHERE id = 'Build'";
        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while(result.next()){
          players = result.getString("players");
        }
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return players;
  }

  private String getConnectionString(SaveBuildDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(LoadBuildDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(ImportRosterDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

}
