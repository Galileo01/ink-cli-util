export type ScanResult = {
    file_path: string;
    code_location: string;
    full_code_location: string;
    arguments: Array<string>;
};
export declare const generateCode: (node: any) => string;
export declare const analyzeFile: (filePath: string, keyword: string, result: Array<ScanResult>) => void;
export declare const traverseScanDir: (dir: string, keyword: string, outDir: string, result: Array<ScanResult>) => void;
export declare const traverseScanDirAsync: (dir: string, keyword: string, outDir: string, result: Array<ScanResult>) => void;
export declare const scanDir: (dir: string, keyword: string, outDir: string) => ScanResult[];
export declare const scanDirAsync: (dir: string, keyword: string, outDir: string) => Promise<ScanResult[]>;
