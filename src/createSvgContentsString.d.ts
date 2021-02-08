import { DxfReadonly } from '@dxfom/dxf';
export interface CreateSvgContentStringOptions {
    readonly warn: (message: string, ...args: any[]) => void;
    readonly resolveColorIndex: (colorIndex: number) => string;
    readonly encoding?: string | TextDecoder;
}
export declare const createSvgContentsString: (dxf: DxfReadonly, options?: Partial<CreateSvgContentStringOptions> | undefined) => string;
