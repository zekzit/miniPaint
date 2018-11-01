import config from "./../../config.js";
import File_open_class from "./open.js";
import Dialog_class from "./../../libs/popup.js";
import alertify from "./../../../../node_modules/alertifyjs/build/alertify.min.js";

/**
 * manages iamge search on https://pixabay.com/en/service/about/api/
 */
class File_search_media_class {
  constructor() {
    this.File_open = new File_open_class();
    this.POP = new Dialog_class();
    this.cache = [];
    this.imedIf = window.imedInterface;
    console.log(this.imedIf);
  }

  /**
   * Image search api
   *
   * @param {string} query
   * @param {array} data
   */
  /*search(query = '', data = []) {
		var _this = this;
		var html = '';

		var key = config.pixabay_key;
		key = key.split("").reverse().join("");

		if (data.length > 0) {
			for (var i in data) {
				html += '<div class="item pointer">';
				html += '<img class="displayBlock" alt="" src="' + data[i].previewURL + '" data-url="' + data[i].webformatURL + '" />';
				html += '</div>';
			}
			//fix for last line
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';
		}

		var settings = {
			title: 'Search',
			comment: 'Powred by <a class="grey" href="https://pixabay.com/">pixabay.com</a>.',
			className: 'wide',
			params: [
				{name: "query", title: "Keyword:", value: query},
			],
			on_load: function (params) {
				var node = document.createElement("div");
				node.classList.add('flex-container');
				node.innerHTML = html;
				document.querySelector('#popup #dialog_content').appendChild(node);
				//events
				var targets = document.querySelectorAll('#popup .item img');
				for (var i = 0; i < targets.length; i++) {
					targets[i].addEventListener('click', function (event) {
						//we have click
						window.State.save();
						this.dataset.url = this.dataset.url.replace('_640.', '_960.');
						var data = {
							url: this.dataset.url,
						};
						_this.File_open.file_open_url_handler(data);
					});
				}
			},
			on_finish: function (params) {
				if (params.query == '')
					return;

				if (_this.cache[params.query] != undefined) {
					//using cache

					setTimeout(function () {
						//only call same fuction after all handlers finishes
						var data = _this.cache[params.query];
						if (parseInt(data.totalHits) == 0) {
							alertify.error('Your search did not match any images.');
						}
						_this.search(params.query, data.hits);
					}, 100);
				}
				else {
					//query to service
					var URL = "https://pixabay.com/api/?key=" + key + "&per_page=50&q=" + encodeURIComponent(params.query);
					$.getJSON(URL, function (data) {
						_this.cache[params.query] = data;

						if (parseInt(data.totalHits) == 0) {
							alertify.error('Your search did not match any images.');
						}
						_this.search(params.query, data.hits);
					})
						.fail(function () {
							alertify.error('Error connecting to service.');
						});
				}
			},
		};
		this.POP.show(settings);
	}*/

  async search() {
    const _this = this;

    var settings = {
      title: "Templates",
      comment: "",
      className: "wide",
      params: [
        // {name: "query", title: "Keyword:", value: query},
      ],
      on_load: async function(params) {
        let drawingGroups = [];
        if (!_this.imedIf) {
          console.warn("No iMed interface, might be no data");
        } else {
          drawingGroups = await _this.imedIf.getTemplates();
        }
		let container = $("<div>");

        // Generate SELECT component for select drawing group
        let selectDrawingGroups = $("<select>");
        selectDrawingGroups.attr("id", "drawingGroupSelector");
        selectDrawingGroups.css("width", "100%");
        let defaultOption = $("<option>");
        defaultOption.text("-- กรุณาเลือกกลุ่ม Template --");
        defaultOption.val("");
        selectDrawingGroups.append(defaultOption);
        drawingGroups.map(group => {
          let groupOption = $("<option>");
          groupOption.text(group.drawing_group_name);
          groupOption.val(group.drawing_group_name);
          selectDrawingGroups.append(groupOption);
        });
        container.append(selectDrawingGroups);

        // Generate panel for display selected drawing group
        let drawingTemplate = $("<div>");
        drawingTemplate.attr("id", "template-panel");
        drawingTemplate.css("width", "100%");
        drawingTemplate.css("height", "50vh");
        drawingTemplate.css("text-align", "left");
        drawingTemplate.css("overflow-y", "scroll");
        container.append(drawingTemplate);

        var node = document.createElement("div");
        node.classList.add("flex-container");
        node.innerHTML = container.html();
        document.querySelector("#popup #dialog_content").appendChild(node);

		// Register event after append on page
		const templatePanel = $("#template-panel");
		templatePanel.append(_this.listAllImages(drawingGroups, _this));

        $("#drawingGroupSelector").on("change", function(event) {
          const selectedGroupName = event.target.value;
          const selectedGroup = drawingGroups.find(
            group => group.drawing_group_name == selectedGroupName
          );
          const templatePanel = $("#template-panel");

          templatePanel.empty();
          if (
            selectedGroup &&
            selectedGroup.listBaseDrawingGroupDetail.length > 0
          ) {
            selectedGroup.listBaseDrawingGroupDetail.forEach(drawing => {
			  let templateItem = _this._createTemplatePanel(drawing, _this);
			  templatePanel.css("text-align", "left");
              templatePanel.append(templateItem);
             
            });
          } else {
			templatePanel.append(_this.listAllImages(drawingGroups, _this));
          }
		});
      }
    };
    this.POP.show(settings);
  }

  _createTemplatePanel(drawing, _this) {
	const templateItem = $("<div>");
	const templateItemImage = $("<div>");
	const templateItemText = $("<div>");

	templateItem.data("url", `templates/${drawing.img_url}`);
	templateItemImage.css(
	  "background-image",
	  `url('templates/${drawing.thumbnail_url}`
	);
	templateItemImage.css("background-position", "center");
	templateItemImage.css("background-size", "contain");
	templateItemImage.css("width", "128px");
	templateItemImage.css("height", "128px");
	templateItemText.text(drawing.title);
	templateItem.css("display", "inline-block");
	templateItem.css("padding-top", "0.5rem");
	templateItem.css("padding-right", "0.5rem");
	templateItem.css("text-align", "center");

	templateItem.on("click", function(event) {
		window.State.save();
		const target = $(this);
		var data = {
		  url: target.data("url")
		};
		_this.File_open.file_open_url_handler(data);
	  });

	templateItem.append(templateItemImage);
	templateItem.append(templateItemText);

	return templateItem;
  }

  listAllImages(drawingGroups, _this) {
    let divAllImages = $("<div>");
    drawingGroups.forEach(group => {
		let divLabel = $('<div>');
		divLabel.text(group.drawing_group_name);
		divLabel.css('width', '100%');
		divLabel.css('background-color', 'white');
		divLabel.css('font-size', 'large');
		divLabel.css('font-weight', 'bold');
		divLabel.css('margin-top', '0.5em');
		divAllImages.append(divLabel);
		group.listBaseDrawingGroupDetail.forEach(drawing => {
			let templateItem = this._createTemplatePanel(drawing, _this);
			divAllImages.append(templateItem);
		});
	});

    return divAllImages;
  }
}

export default File_search_media_class;
