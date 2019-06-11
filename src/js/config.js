//main config file

var config = {};

config.TRANSPARENCY = false;
config.TRANSPARENCY_TYPE = 'squares'; //squares, green, grey
config.LANG = 'en';
config.WIDTH = 1024;
config.HEIGHT = 768;
config.visible_width = null;
config.visible_height = null;
config.COLOR = '#0080C0';
config.ALPHA = 255;
config.ZOOM = 1;
config.pixabay_key = '3ca2cd8af3fde33af218bea02-9021417';
config.layers = [];
config.layer = null;
config.need_render = false;
config.mouse = {};

//requires styles in reset.css
config.themes = [
	'light',
	'dark',
	'green',
];

config.TOOLS = [
	{
		name: 'add_image_from_template',
		title: 'Add image from template...',
		on_activate: 'on_activate',
		attributes: {
			size: 30,
		},
	},
	{
		name: 'add_image_from_local',
		title: 'Add image from Computer...',
		on_activate: 'on_activate',
		attributes: {
			size: 30,
		},
	},
	{
		name: 'separator'
	},
	{
		name: 'select',
		title: 'Select object tool',
		attributes: {
			auto_select: true,
		},
	},
	{
		name: 'selection',
		title: 'Selection',
		attributes: {},
		on_leave: 'on_leave',
	},
	{
		name: 'brush',
		title: 'Brush',
		attributes: {
			size: 4,
			smart_brush: true,
		},
	},
	{
		name: 'pencil',
		title: 'Pencil',
		on_update: 'on_params_update',
		attributes: {
			antialiasing: true,
			size: 2,
		},
	},
	// {
	// 	name: 'pick_color',
	// 	title: 'Pick Color',
	// 	attributes: {
	// 		global: false,
	// 	},
	// },
	{
		name: 'erase',
		title: 'Erase',
		on_activate: 'on_activate',
		on_update: 'on_params_update',
		attributes: {
			size: 30,
			circle: true,
			strict: true,
		},
	},
	// {
	// 	name: 'magic_wand',
	// 	title: 'Magic Wand Tool',
	// 	attributes: {
	// 		power: 15,
	// 		anti_aliasing: true,
	// 		contiguous: false,
	// 	},
	// },
	{
		name: 'fill',
		title: 'Fill',
		attributes: {
			power: 5,
			anti_aliasing: false,
			contiguous: false,
		},
	},
	{
		name: 'line',
		title: 'Line',
		attributes: {
			size: 1,
			type: {
				value: 'Simple',
				values: ['Simple', 'Arrow'],
			},
		},
	},
	{
		name: 'rectangle',
		title: 'Rectangle',
		attributes: {
			size: 1,
			radius: 0,
			fill: true,
			square: false,
		},
	},
	{
		name: 'circle',
		title: 'Circle',
		attributes: {
			size: 1,
			fill: true,
			circle: false,
		},
	},
	{
		name: 'text',
		title: 'Text',
		attributes: {
			size: 40,
			bold: false,
			italic: false,
			stroke: false,
			align: {
				value: 'Left',
				values: ["Left", "Center", "Right"],
			},
			family: {
				value: 'Arial',
				values: ["Arial", "Courier", "Impact", "Helvetica", "monospace", "Times New Roman", "Verdana"],
			},
			stroke_size: 1,
		},
	},
	// {
	// 	name: 'gradient',
	// 	title: 'Gradient',
	// 	attributes: {
	// 		color_1: '#008000',
	// 		color_2: '#ffffff',
	// 		alpha: 0,
	// 		radial: false,
	// 		radial_power: 50,
	// 	},
	// },
	// {
	// 	name: 'clone',
	// 	title: 'Clone tool',
	// 	attributes: {
	// 		size: 30,
	// 		anti_aliasing: true,
	// 		source_layer: {
	// 			value: 'Current',
	// 			values: ['Current', 'Previous'],
	// 		},
	// 	},
	// },
	{
		name: 'crop',
		title: 'Crop',
		on_update: 'on_params_update',
		on_leave: 'on_leave',
		attributes: {
			crop: true,
		},
	},
	// {
	// 	name: 'blur',
	// 	title: 'Blur tool',
	// 	attributes: {
	// 		size: 30,
	// 		strength: 1,
	// 	},
	// },
	// {
	// 	name: 'sharpen',
	// 	title: 'Sharpen tool',
	// 	attributes: {
	// 		size: 30,
	// 	},
	// },
	// {
	// 	name: 'desaturate',
	// 	title: 'Desaturate',
	// 	attributes: {
	// 		size: 50,
	// 		anti_aliasing: true,
	// 	},
	// },
	// {
	// 	name: 'bulge_pinch',
	// 	title: 'Bulge/Pinch tool',
	// 	attributes: {
	// 		radius: 80,
	// 		power: 50,
	// 		bulge: true,
	// 	},
	// },
	// {
	// 	name: 'animation',
	// 	title: 'Play animation',
	// 	on_update: 'on_params_update',
	// 	on_leave: 'on_leave',
	// 	attributes: {
	// 		play: false,
	// 		delay: 400,
	// 	},
	// },
];

//link to active tool
config.TOOL = config.TOOLS[2];

	
export default config;