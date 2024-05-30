import { Browser } from "puppeteer";

export type ServiceAbstractConstructor = {
  new (browser: Browser, input: string): ServiceAbstract;
};
export abstract class ServiceAbstract {
  protected readonly browser: Browser;
  protected readonly input: string;

  constructor(
    private readonly serviceName: string,
    browser: Browser,
    input: string
  ) {
    this.browser = browser;
    this.input = input;
  }
  protected abstract executor(): Promise<void>;

  public async bootstrap() {
    const endProcess = this.processDurationCheck();
    this.mount();
    await this.executor();
    endProcess();
    this.unmount();
  }
  private processDurationCheck() {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`Process completed in ${duration.toFixed(2)} milliseconds`);
    };
  }
  private async mount() {
    console.log(
      `---------------- [Service mounted] :: process :: (${this.serviceName}) ----------------`
    );
  }
  private async unmount() {
    console.log(
      `---------------- [Service unmounted] :: process :: (${this.serviceName}) ----------------`
    );
  }

  protected logger(content: string | undefined | null, label: string) {
    console.log(` ---------- ${label} ---------- \n`, content || "");
  }
}
