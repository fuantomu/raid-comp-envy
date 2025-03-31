

export abstract class DateParser {

  public static getDate(date : String, time: String): Date {
    const newDate = new Date()

    const splitDate = date.split("/")
    const splitTime = time.split(":")

    if(splitDate[0].length === 4){
      newDate.setFullYear(parseInt(splitDate[0]), parseInt(splitDate[1])-1, parseInt(splitDate[2]))
    }
    else{
      const month = splitDate[1].length === 1 ? `0${splitDate[1]}` : splitDate[1];
      const day = splitDate[0].length === 1 ? `0${splitDate[0]}` : splitDate[0];
      newDate.setFullYear(parseInt(`${new Date().getFullYear().toString().substring(0,2)}${splitDate[2]}`), parseInt(month)-1, parseInt(day))
    }
    newDate.setHours(parseInt(splitTime[0]),parseInt(splitTime[1]),parseInt(splitTime[2]))



    return newDate;
  }

}
