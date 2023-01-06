class TextRewriter implements HTMLRewriterElementContentHandlers {
  private value: string;

  public constructor(value: string) {
    this.value = value;
  }

  public element(element: Element): void {
    element.setInnerContent(`${this.value}`);
  }
}

class MetaRewriter implements HTMLRewriterElementContentHandlers {
  private name: string;
  private value: string;

  public constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  public element(element: Element): void {
    if (element.getAttribute("name") === this.name) {
      element.setAttribute("content", this.value);
    }
  }
}

export const makeRewriter = (title?: string, description?: string) => {
  const htmlRewriter = new HTMLRewriter();
  if (title) {
    htmlRewriter.on("title", new TextRewriter(title));
  }
  if (description) {
    htmlRewriter.on("meta", new MetaRewriter("description", description));
  }
  return htmlRewriter;
};
