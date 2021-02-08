import { DxfRecordReadonly } from '@dxfom/dxf';
import { DxfMTextContentElement } from 'mtextjs';
export declare const MTEXT_attachmentPoint: (n: string | number | undefined) => {
    dominantBaseline: string | undefined;
    textAnchor: string | undefined;
};
export declare const MTEXT_angle: (mtext: DxfRecordReadonly) => number;
export declare const MTEXT_contents: (contents: readonly DxfMTextContentElement[], i?: number) => string;
