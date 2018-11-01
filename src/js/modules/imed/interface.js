import config from "./../../config.js";
import Base_layers_class from "./../../core/base-layers.js";
import Helper_class from "./../../libs/helpers.js";
import Dialog_class from "./../../libs/popup.js";
import alertify from "./../../../../node_modules/alertifyjs/build/alertify.min.js";
import canvasToBlob from "./../../../../node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.min.js";
import filesaver from "./../../../../node_modules/file-saver/FileSaver.min.js";
import GIF from "./../../libs/gifjs/gif.js";
import File_save_class from "./../file/save.js";

var instance = null;

/**
 * manages files / save
 *
 * @author D.Seksit
 */
class Imed_interface_class {
  constructor() {
    //singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.Base_layers = new Base_layers_class();
    this.Helper = new Helper_class();
    this.POP = new Dialog_class();

    this.set_events();

    this.noIMedIfMessage = "Sorry, cannot contact iMed this time.";
    this.imedIf = window.imedInterface;

    this.saveInstance = new File_save_class();

    this.saveOption = {};
    this.saveOption.BASE = {
      name: "",
      layers: "All",
      quality: 90,
      delay: 400
    };

    this.saveOption.JSON = Object.assign({}, this.saveOption.BASE);
    this.saveOption.JSON.type = "JSON";

    this.saveOption.PNG = Object.assign({}, this.saveOption.BASE);
    this.saveOption.PNG.type = "PNG";

    this.saveOption.JPG = Object.assign({}, this.saveOption.BASE);
    this.saveOption.JPG.type = "JPG";
  }

  set_events() {
    var _this = this;

    document.addEventListener(
      "keydown",
      function(event) {
        var code = event.keyCode;
        if (
          event.target.type == "text" ||
          event.target.tagName == "INPUT" ||
          event.target.type == "textarea"
        )
          return;

        if (code == 83) {
          //save
          _this.save();
          event.preventDefault();
        }
      },
      false
    );
  }

  _saveActionWrapper(option) {
    const _this = this;
    return new Promise((resolve, reject) => {
      if (!option) {
        reject("Save without providing option.");
        return;
      }
      _this.saveInstance.save_action(option, {
        saveAs(blob, fname) {
          resolve(blob, fname);
        }
      });
    });
  }

  async _save() {
    const result = {};
    result.jsonBlob = await this._saveActionWrapper(this.saveOption.JSON);
    result.jpgBlob = await this._saveActionWrapper(this.saveOption.JPG);
    return result;
  }

  async delete() {
    if (!this.imedIf) {
      alert(this.noIMedIfMessage);
    }
    this.imedIf.deleteImage();
  }

  async save() {
    if (!this.imedIf) {
      alert(this.noIMedIfMessage);
    }
    const blobs = await this._save();
    this.imedIf.saveImage(blobs);
  }

  async save_and_close() {
    if (!this.imedIf) {
      alert(this.noIMedIfMessage);
    }
    const blobs = await this._save();
    this.imedIf.saveImageAndClose(blobs);
  }

  async close() {
    if (!this.imedIf) {
      alert(this.noIMedIfMessage);
    }
    this.imedIf.closeWindow();
  }
}

export default Imed_interface_class;
