import { DxfRecordReadonly } from '@dxfom/dxf';
export declare const nearlyEqual: (a: number, b: number) => boolean;
export declare const round: (n: number, precision: number) => number;
export declare const trim: (s: string | undefined) => string | undefined;
export declare const negate: (s: string | undefined) => string | undefined;
export declare const $trim: (record: DxfRecordReadonly | undefined, groupCode: number) => string | undefined;
export declare const $negate: (record: DxfRecordReadonly | undefined, groupCode: number) => string | undefined;
export declare const $number: (record: DxfRecordReadonly | undefined, groupCode: number, defaultValue?: number | undefined) => number;
