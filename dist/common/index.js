import path from "path";
import { fileURLToPath } from "url";
const common_filename = fileURLToPath(import.meta.url);
const common_dirname = path.dirname(common_filename);
export { common_dirname as __dirname, common_filename as __filename };
