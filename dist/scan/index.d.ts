export type ScanCommandProps = {
    /** 搜索关键词 keyword */
    keyword: string;
    /** 搜索目录 dir */
    dir?: string;
    /** 文件输出目录 out-dir */
    outDir?: string;
};
declare const ScanCommand: (props: ScanCommandProps) => import("react/jsx-runtime").JSX.Element;
export default ScanCommand;
