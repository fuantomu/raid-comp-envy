import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { PassportAuthenticator, Server } from "typescript-rest";
import { SchedulingService } from "./service/scheduling.service";
import { errorHandler, undefinedHandler } from "./util/error-handler";

export class ApiServer {
  public PORT: number = +process.env.PORT || 3000;

  private readonly app: express.Application;
  private server: http.Server = null;

  constructor() {
    this.app = express();
    this.config();

    Server.loadServices(this.app, "controller/*", __dirname);

    if (process.env.ENABLE_SWAGGER === "true") {
      Server.swagger(this.app, { filePath: "./dist/swagger.json" });
    }

    this.app.use("*", undefinedHandler);
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  public async start() {
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, () => {
        SchedulingService.init();

        // tslint:disable-next-line:no-console
        console.log(`Listening on http://localhost:${this.PORT}`);

        return resolve();
      });
    });
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    });
  }

  /**
   * Configure the express app.
   */
  private config(): void {
    // Native Express configuration
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(morgan("combined"));
    this.configureAuthenticator();
  }

  private configureAuthenticator() {
    const JWT_SECRET: string = "some-jwt-secret";
    const jwtConfig: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(JWT_SECRET),
    };
    const strategy = new Strategy(
      jwtConfig,
      (payload: any, done: (err: any, user: any) => void) => {
        done(null, payload);
      }
    );
    const authenticator = new PassportAuthenticator(strategy, {
      deserializeUser: (user: string) => JSON.parse(user),
      serializeUser: (user: any) => {
        return JSON.stringify(user);
      },
    });
    Server.registerAuthenticator(authenticator);
    Server.registerAuthenticator(authenticator, "secondAuthenticator");
  }
}
