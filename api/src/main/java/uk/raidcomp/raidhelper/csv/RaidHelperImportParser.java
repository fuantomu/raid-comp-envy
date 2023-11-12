package uk.raidcomp.raidhelper.csv;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.inject.Singleton;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import uk.raidcomp.raidhelper.model.RaidHelperEvent;
import uk.raidcomp.raidhelper.model.RaidHelperSignup;

@Singleton
public class RaidHelperImportParser {
  public RaidHelperEvent parse(final String raw) {
    final String[] lines = raw.split("\n");
    return parseEvent(lines[1], parseSignups(Arrays.copyOfRange(lines, 4, lines.length)));
  }

  private RaidHelperEvent parseEvent(final String line, final List<RaidHelperSignup> signups) {
    final List<String> header = readLines(line).get(0);
    return new RaidHelperEvent(
        header.get(0),
        header.get(1),
        header.get(2),
        header.get(3),
        header.get(4),
        header.get(5),
        signups);
  }

  private List<RaidHelperSignup> parseSignups(final String[] lines) {
    return readLines(String.join("\n", lines)).stream()
        .filter(s -> s.size() == 6)
        .map(
            signup ->
                new RaidHelperSignup(
                    signup.get(0),
                    signup.get(1),
                    signup.get(2),
                    signup.get(3),
                    signup.get(4),
                    signup.get(5)))
        .toList();
  }

  private List<List<String>> readLines(final String csv) {
    List<List<String>> records = new ArrayList<List<String>>();
    try (CSVReader csvReader = new CSVReader(new StringReader(csv)); ) {
      String[] values = null;
      while ((values = csvReader.readNext()) != null) {
        records.add(Arrays.asList(values));
      }
    } catch (IOException | CsvValidationException e) {
      throw new RuntimeException(e);
    }
    return records;
  }
}
