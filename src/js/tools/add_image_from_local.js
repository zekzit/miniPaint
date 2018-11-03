import config from './../config.js';
import Base_tools_class from './../core/base-tools.js';
import File_open_class from './../modules/file/open.js';

class Add_image_from_local_class extends Base_tools_class {

	constructor(ctx) {
		super();
		this.Seach = new File_open_class();
		this.name = 'media';
	}

	load() {
		//nothing
	}

	render(ctx, layer) {
		//nothing
	}

	on_activate() {
		this.Seach.open_file();
	}
}
;
export default Add_image_from_local_class;
