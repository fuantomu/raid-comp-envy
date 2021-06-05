import * as cron from "node-cron";
import { BuildDelegate } from "./build-delegate";

export class SchedulingService {
  private static INSTANCE: SchedulingService;

  private services: ScheduledService[] = [
    //
    { cron: "0 0 * * *", caller: this.cleanOldBuilds },
    //
  ];

  private constructor() {
    this.services.forEach((service) => {
      cron.schedule(service.cron, service.caller);
    });
  }

  private static getInstance() {
    if (!SchedulingService.INSTANCE) {
      SchedulingService.INSTANCE = new SchedulingService();
    }
    return SchedulingService.INSTANCE;
  }

  private cleanOldBuilds() {
    console.log("Pruning old builds...");
    BuildDelegate.deleteOldBuilds(30)
      .then((count) => {
        if (count) {
          console.log(`Pruned ${count} records.`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public static init(): void {
    SchedulingService.getInstance();
  }
}

interface ScheduledService {
  cron: string;
  caller: () => void;
}
