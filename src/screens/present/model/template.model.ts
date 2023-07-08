import { Template } from "../../../types/template";

export class TemplateModel {
  public template: Template;

  constructor(templateString: string) {
    const object = JSON.parse(templateString);
    this.template = object;
  }
}
