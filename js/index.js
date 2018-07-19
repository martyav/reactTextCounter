var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextBox = function (_React$Component) {
    _inherits(TextBox, _React$Component);

    function TextBox(props) {
        _classCallCheck(this, TextBox);

        var _this = _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, props));

        _this.state = {
            textBoxContents: "",
            count: 0,
            options: "words"
        };

        _this.handleRadioSelection = _this.handleRadioSelection.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleClearButtonClick = _this.handleClearButtonClick.bind(_this);
        return _this;
    }

    _createClass(TextBox, [{
        key: "countCharacters",
        value: function countCharacters(text) {
            return text.length;
        }
    }, {
        key: "countWords",
        value: function countWords(text) {
            return text.trim().split(" ").length;
        }
    }, {
        key: "countInstancesOfAString",
        value: function countInstancesOfAString(text, match) {
            return text.trim().toLowerCase().split(" ").filter(function (word) {
                return word.includes(match);
            }).length;
        }
    }, {
        key: "countMethod",
        value: function countMethod(text, option) {
            var newCountMethod = void 0;
            option = option.toLowerCase();

            if (option === "words") {
                if (text === "") {
                    return 0; // JS is counting the empty string as a single word
                }

                newCountMethod = this.countWords;
            } else if (option === "characters") {
                newCountMethod = this.countCharacters;
            } else if (option === "instances") {
                newCountMethod = this.countInstancesOfAString;
                return newCountMethod(text, "fuck");
            }

            return newCountMethod(text);
        }
    }, {
        key: "handleRadioSelection",
        value: function handleRadioSelection(event) {
            var selected = event.target.value;
            console.log(selected);
            var newCount = this.countMethod(this.state.textBoxContents, selected);

            this.setState({
                options: selected,
                count: newCount
            });
        }
    }, {
        key: "handleFormChange",
        value: function handleFormChange(event) {
            event.preventDefault();

            var newContents = event.target.value;
            var newCount = this.countMethod(newContents, this.state.options);

            this.setState({
                textBoxContents: newContents,
                count: newCount
            });
        }
    }, {
        key: "handleClearButtonClick",
        value: function handleClearButtonClick(event) {
            event.preventDefault();

            this.clearText();
        }
    }, {
        key: "clearText",
        value: function clearText() {
            var element = this.refs["TextInput"];

            element.value = "";
            element.placeholder = "";

            this.setState({
                textBoxContents: "",
                count: 0
            });
        }
    }, {
        key: "renderRadio",
        value: function renderRadio(value) {
            return React.createElement("input", {
                type: "radio",
                name: "options",
                value: value.toLowerCase(),
                onChange: this.handleRadioSelection,
                checked: this.state.options === value.toLowerCase()
            });
        }
    }, {
        key: "renderCount",
        value: function renderCount() {
            if (this.state.options === "characters") {
                return React.createElement(
                    "section",
                    { className: "Count" },
                    React.createElement(
                        "p",
                        null,
                        "Number of characters: ",
                        this.state.count
                    )
                );
            } else if (this.state.options === "words") {
                return React.createElement(
                    "section",
                    { className: "Count" },
                    React.createElement(
                        "p",
                        null,
                        "Number of words: ",
                        this.state.count
                    )
                );
            } else if (this.state.options === "instances") {
                return React.createElement(
                    "section",
                    { className: "Count" },
                    React.createElement(
                        "p",
                        null,
                        "Number of fucks given: ",
                        this.state.count
                    )
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "section",
                    { className: "UserText" },
                    React.createElement(
                        "form",
                        null,
                        React.createElement(
                            "section",
                            { className: "Options" },
                            this.renderRadio("Words"),
                            " Words",
                            this.renderRadio("Characters"),
                            " Characters",
                            this.renderRadio("Instances"),
                            " Fucks"
                        ),
                        React.createElement("textarea", {
                            className: "TextInput",
                            ref: "TextInput",
                            type: "text",
                            onChange: this.handleFormChange,
                            placeholder: "Type here"
                        }),
                        React.createElement(
                            "button",
                            {
                                className: "Reset",
                                type: "reset",
                                onClick: this.handleClearButtonClick
                            },
                            "Clear Textbox"
                        )
                    )
                ),
                this.renderCount()
            );
        }
    }]);

    return TextBox;
}(React.Component);

function App() {
    return React.createElement(
        "div",
        { className: "App" },
        React.createElement(
            "h1",
            null,
            "Word & Character Count"
        ),
        React.createElement(TextBox, null)
    );
}

var rootElement = document.getElementById("root");
ReactDOM.render(React.createElement(App, null), rootElement);