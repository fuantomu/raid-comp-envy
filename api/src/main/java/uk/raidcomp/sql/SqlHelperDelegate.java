package uk.raidcomp.sql;

import io.micronaut.runtime.http.scope.RequestScope;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import uk.raidcomp.api.controller.dto.PlayerDto;
import uk.raidcomp.api.controller.dto.imports.ImportRosterDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildDto;
import uk.raidcomp.api.controller.dto.save.SaveRosterDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildDto;
import uk.raidcomp.api.controller.dto.delete.DeleteBuildDto;
import uk.raidcomp.api.controller.dto.delete.DeleteRosterDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;
import uk.raidcomp.api.model.WarcraftPlayerRace;
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
          PlayerDto p = new PlayerDto(result.getString("id"),result.getString("name"), null, WarcraftPlayerClass.findByValue(result.getString("className")), WarcraftPlayerSpec.findByValue(result.getString("spec"),result.getString("className")),WarcraftPlayerRace.findByValue(result.getString("race")), InviteStatus.UNKNOWN, null, result.getString("main"));
          teams.add(p);
        }

        connection.close();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }


      return teams;
  }


  public String saveBuild(SaveBuildDto connectionString) {
      JsonArray playerJSON = new JsonArray();
      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());

        for(PlayerDto player : connectionString.players()){
          JsonObject tempJson = new JsonObject();
          tempJson.addProperty("id", player.id().toString());
          tempJson.addProperty("name", player.name());
          tempJson.addProperty("realm", player.realm());
          tempJson.addProperty("className", player.className().name());
          tempJson.addProperty("spec", player.spec().name());
          tempJson.addProperty("race", player.race().name());
          tempJson.addProperty("status", player.status().name());
          tempJson.addProperty("group", player.group().name());
          tempJson.addProperty("main", player.main());
          playerJSON.add(tempJson);
        }
        String query = "REPLACE INTO `"+connectionString.table()+"` (id, lastSeen, name, players) VALUES (?,?,?,?)";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setString(1, "Build-"+connectionString.build());
        statement.setLong(2, new java.util.Date().getTime());
        statement.setString(3, connectionString.build());
        statement.setString(4, playerJSON.toString());

        statement.execute();
        connection.close();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return playerJSON.toString();
  }

  public String saveRoster(SaveRosterDto connectionString) {
      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());

        for(PlayerDto player : connectionString.players()){
          String query = "REPLACE INTO `"+connectionString.table()+"` (id, name, realm, className, spec, race, main) VALUES (?,?,?,?,?,?,?)";
          PreparedStatement statement = connection.prepareStatement(query);
          statement.setString(1, player.id().toString());
          statement.setString(2, player.name());
          statement.setString(3, player.realm());
          statement.setString(4, player.className().name());
          statement.setString(5, player.spec().name().split("_")[1]);
          statement.setString(6, player.race().name());
          statement.setString(7, player.main());
          statement.execute();
        }

        connection.close();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return "";
  }

  public String loadBuild(LoadBuildDto connectionString) {
      String players = "";

      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());
        String query = "SELECT * from `"+connectionString.table()+"` WHERE id = 'Build-"+connectionString.build()+"'";
        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while(result.next()){
          players = result.getString("players");
        }

        connection.close();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

      return players;
  }

  public String deleteBuild(DeleteBuildDto connectionString) {
    String result = "";
      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());
        String query = "DELETE from `"+connectionString.table()+"` WHERE id = 'Build-"+connectionString.build()+"'";
        Statement statement = connection.createStatement();
        result += statement.executeUpdate(query);

        connection.close();

      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

    return result;
  }

  public String deleteRosterPlayers(DeleteRosterDto connectionString) {
    String result = "";
      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection(getConnectionString(connectionString), connectionString.uid(), connectionString.password());
        String query = "DELETE from `"+connectionString.table()+"` WHERE id = ?";
        PreparedStatement statement = connection.prepareStatement(query);
        for(PlayerDto player : connectionString.players()){
          statement.setObject(1,player.id());
          result += statement.executeUpdate();
        }

        connection.close();
      }
      catch (SQLException se){
        se.printStackTrace();
      }
      catch (ClassNotFoundException ce){
        ce.printStackTrace();
      }

    return result;
  }

  private String getConnectionString(SaveBuildDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(SaveRosterDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(LoadBuildDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(ImportRosterDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(DeleteBuildDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }

  private String getConnectionString(DeleteRosterDto Dto){
    return "jdbc:mysql://"+Dto.server()+":"+Dto.port()+"/"+Dto.database()+"?verifyServerCertificate=false&useSSL=false";
  }
}
