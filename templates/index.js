const templates = [
  {
    fixDrawingType: "OPERATION",
    filename: "or.json"
  },
  {
    fixDrawingType: "DOCTOR",
    filename: "pysicalex.json"
  }
];

export default {
  async getTemplates(fixDrawingType) {
    const templateFilename =
      templates.find(template => template.fixDrawingType == fixDrawingType) ||
      null;
    if (!templateFilename) {
      throw new Error("No template file match.");
    }

    return fetch(templateFilename).then(response => response.json());
  }
};
