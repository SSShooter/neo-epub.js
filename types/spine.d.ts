import Packaging from "./packaging";
import Section from "./section";
import Hook from "./utils/hook";
import EpubCFI from "./epubcfi";

export default class Spine {
  constructor();

  spineItems: Section[];
  spineByHref: { [key: string]: number };
  spineById: { [key: string]: number };

  hooks: {
    serialize: Hook,
    content: Hook
  };

  epubcfi: EpubCFI;
  loaded: boolean;
  items: any[];
  manifest: any;
  spineNodeIndex: any;
  baseUrl: string;
  length: number;

  unpack(_package: Packaging, resolver: Function, canonical: Function): void;

  get(target?: string | number): Section | null;

  each(...args: any[]): any;

  first(): Section | undefined;

  last(): Section | undefined;

  destroy(): void;

  private append(section: Section): number;

  private prepend(section: Section): number;

  private remove(section: Section): Section[] | undefined;
}
