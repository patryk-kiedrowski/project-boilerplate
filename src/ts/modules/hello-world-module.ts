export class HelloWorld {
  private message: string;

  constructor () {
    this.message = 'Hello World from hello-world-module.ts';
  }

  public showAlert(): void {
    alert(this.message);
  }
}