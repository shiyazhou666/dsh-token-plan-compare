// DSH 运行时类型声明（这些包在运行时由 Harness 宿主提供，开发时不需要安装）
declare module '@deepseek-ai/cordis' {
  export interface Context {
    tools: {
      register(tool: unknown): void;
    };
    logger: {
      info(msg: string): void;
      warn(msg: string): void;
      error(msg: string): void;
    };
    on(event: string, handler: (...args: unknown[]) => void): void;
    effect(fn: () => (() => void) | void): void;
    get(name: string): unknown;
    plugin(service: unknown): void;
  }
  export const Context: Context;
}

declare module '@deepseek-ai/cordis/client' {
  export interface Context {
    webview: {
      registerSidebarTab(config: {
        id: string;
        label: string;
        render(el: HTMLElement): void;
      }): void;
    };
    events?: {
      on(event: string, handler: (...args: unknown[]) => void): void;
      emit(event: string, ...args: unknown[]): void;
    };
  }
  export const Context: Context;
}

declare module '@deepseek-ai/dsh-tools' {
  export function defineTool(config: any): any;
}

declare module '@deepseek-ai/schemastery' {
  const z: any;
  export default z;
  export type z = any;
}
