declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(
      target: string | string[] | Element | Element[],
      options?: {
        type?: string;
        linesClass?: string;
        wordsClass?: string;
        charsClass?: string;
      }
    );
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ScrollSmoother: any;
  export { ScrollSmoother };
}
