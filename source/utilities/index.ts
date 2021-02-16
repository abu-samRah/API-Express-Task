import loadJsonFile from 'load-json-file';
import fs from 'fs';
export const readFile = (source: string) => {
    return loadJsonFile.sync(source);
};

export function saveToFile<T>(dataToSave: T[], outputFile: string) {
    let data = [dataToSave];

    fs.writeFileSync(outputFile, data.map((element) => JSON.stringify(element)).join(',\n'));
}
export default readFile;

//utilitis folder , 