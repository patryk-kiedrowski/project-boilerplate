require('../scss/main.scss');

// example code, can be deleted entirely
import { HelloWorld } from './modules/hello-world-module';

class Main {
  public helloWorld: HelloWorld = new HelloWorld();
  
  constructor (
    private printMessage: string
  ) {
    this.writeToDocument();
    this.callMethodFromOtherModule();
  }

  writeToDocument(): void {
    document.write(`<h1>Hello ${this.printMessage}</h1>`);
  }

  callMethodFromOtherModule(): void {
    this.helloWorld.showAlert();
  }
}

const main = new Main('World!');