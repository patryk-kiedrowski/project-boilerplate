require('../scss/main.scss');
import { HelloWorld } from './modules/hello-world-module';

class Main {
  public helloWorld: HelloWorld = new HelloWorld();
  public asdf: Function = () => {
    console.log('I work');
  }
  
  constructor (
    private printMessage: string
  ) {
    this.writeToDocument();
    this.callMethodFromOtherModule();
    this.asdf();
  }

  writeToDocument(): void {
    document.write(`<h1>Hello ${this.printMessage}</h1>`);
    
  }

  callMethodFromOtherModule(): void {
    this.helloWorld.showAlert();
  }
}

const main = new Main('World!');