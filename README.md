# Swift Moya Code Generator (Paw Extension)

A [Paw Extension](http://luckymarmot.com/paw/extensions/) that generates [Moya](https://github.com/Moya/Moya) code for you! 🔨😎🎉


## Install
* Donwload the project and rename the folder to `com.nam.PawExtensions.SwiftMoyaCodeGenerator`
* Open Paw -> Preferences -> Extensions -> Open Extensions Directory
* Copy the `com.nam.PawExtensions.SwiftMoyaCodeGenerator` folder to extensions directory


## Features
* Parsing query params
* Parsing key-value object provided as JSON Body
* Type matching for params (`String` or `Int` based on param data provided in PAW, e.g. id = 2 will generate `let id: Int`)

### TODO
Still lots to be done... See issues for a good start or write your own. If you feel like contributing you are more than welcome 🍻 (I will try to merge PR's as soon as possible :smile:)

### License

This Paw Extension is released under the [MIT License](LICENSE). Feel free to fork, and modify!


### Credits

* [Mustache.js](https://github.com/janl/mustache.js/), also released under the MIT License
* [URI.js](http://medialize.github.io/URI.js/), also released under the MIT License
