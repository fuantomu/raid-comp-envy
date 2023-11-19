package uk.raidcomp.sql;

import io.micronaut.runtime.http.scope.RequestScope;
import java.util.ArrayList;
import java.util.List;

import uk.raidcomp.api.controller.dto.PlayerDto;
import uk.raidcomp.api.controller.dto.imports.ImportRosterDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.Player;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;

import java.sql.*;

@RequestScope
public class SqlHelperDelegate {
  private final BuildDelegate buildDelegate;

  public SqlHelperDelegate(final BuildDelegate buildDelegate) {
    this.buildDelegate = buildDelegate;
  }

    public List<PlayerDto> getRoster(ImportRosterDto connectionString) {
      final List<PlayerDto> teams = new ArrayList<>();

      try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection("jdbc:mysql://"+connectionString.server()+":"+connectionString.port()+"/"+connectionString.database()+"?verifyServerCertificate=false&useSSL=false", connectionString.uid(), connectionString.password());
        String query = "SELECT * from player";
        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while(result.next()){
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


}
