import fs from "fs";
import path from "path";

function csvToJson(csv: string): any[] | { error: string } {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(",");

    if (currentline.length === headers.length) {
      for (let j = 0; j < headers.length; j++) {
        const propertyPath = headers[j].trim().split(".");
        let tempObj = obj;

        propertyPath.forEach((prop, index) => {
          if (!tempObj[prop]) {
            tempObj[prop] =
              index === propertyPath.length - 1 ? currentline[j].trim() : {};
          }
          tempObj = tempObj[prop];
        });
      }
      if (
        !obj.name ||
        !obj.name.firstName ||
        !obj.name.lastName ||
        obj.age === undefined
      ) {
        return { error: "Missing mandatory fields" };
      }
      result.push(obj);
    } else {
      console.error("Skipping row", currentline);
    }
  }

  return result;
}

export const convertCSVToJSON = (req: any, resp: any) => {
  try {
    const csvFilePath = process.env.CSV_FILE_PATH;

    if (!csvFilePath) {
      console.error("CSV file path is not configured.");
      return;
    }

    const fullPath = path.resolve(csvFilePath);

    if (!fs.existsSync(fullPath)) {
      console.error("CSV file does not exist:", fullPath);
      return;
    }

    fs.readFile(fullPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the CSV file:", err);
        return;
      }

      console.log(csvToJson(data));
      return resp.json({
        success: true,
        message: "Successfully converted csv to json",
        data: null,
      });
    });
  } catch (error) {
    console.error(error);
  }
};
