(function() {
    var uri = require('/URI');
    var mustache = require('./mustache');

    var SwiftMoyaCodeGenerator = function() {

        this.generate = function(context) {

            var template = readFile("moya.mustache");
            var request = context.getCurrentRequest();
            var url = uri.parse(request.url);

            var requestParameter = "";
            var requestName = request.name;
            var queryParamsType = "";
            var pathExtension = url.path;

            if (request.name.indexOf('{') > 0) {
                requestParameter = request.name.match("{([^']+)}")[1];
                requestName = requestName.replace(request.name.match("{([^']+)}")[0], "");
                requestName = requestName.replace("/", "");
                queryParamsType = requestParameter + ": Int";
            }

            var pathFragments = pathExtension.split('/');
            for (var i = 0; i < pathFragments.length; i++) {
                if (pathFragments[i] == requestName) {
                    pathExtension = pathExtension.replace(pathFragments[i + 1], "\\(" + requestParameter + ")");
                    break;
                }
            }

            var view = {
                "request": request,
                "baseURL": url.protocol + "://" + url.hostname,
                "pathExtension": pathExtension,
                "requestName": requestName,
                "requestParameter": "let " + requestParameter,
            };



            var query = url.query;
            if (query) {
                var fragments = query.split('&');
                var keyvalue = fragments[0].split('=');

                if (queryParamsType) {
                    queryParamsType = queryParamsType + ", " + keyvalue[0] + ": " + typeForObject(keyvalue[1]);
                }else{
                    queryParamsType = keyvalue[0] + ": " + typeForObject(keyvalue[1]);
                }
                var queryParamsTemplate = "_";
                var queryParams = "let " + keyvalue[0];
                var queryDictString = "\"" + keyvalue[0] + "\": " + keyvalue[0];


                for (var i = 1; i < fragments.length; i++) {
                    keyvalue = fragments[i].split('=');
                    queryParamsType += ", " + keyvalue[0] + ": " + typeForObject(keyvalue[1]);
                    queryParamsTemplate += ", _";
                    queryParams += ", let " + keyvalue[0];
                    queryDictString += ", \"" + keyvalue[0] + "\": " + keyvalue[0];
                }

                view["queryParamsTemplate"] = queryParamsTemplate;
                view["queryParams"] = queryParams;
                view["queryDictString"] = queryDictString;
            }

            view["queryParamsType"] = queryParamsType;

            var jsonBody = request.jsonBody;
            if (jsonBody && Object.keys(jsonBody).length > 0) {
                var firstKey = Object.keys(jsonBody)[0];
                var jsonBodyParamsType = firstKey + ": " + typeForObject(jsonBody[firstKey]);
                var jsonBodyParamsTemplate = "_";
                var jsonBodyParams = "let " + firstKey;
                var jsonBodyDictString = "\"" + firstKey + "\": " + firstKey;
                for (var i = 1; i < Object.keys(jsonBody).length; i++) {
                    var key = Object.keys(jsonBody)[i];
                    if (jsonBody.hasOwnProperty(key)) {
                        jsonBodyParamsType += ", " + key + ": " + typeForObject(jsonBody[key]);
                        jsonBodyParamsTemplate += ", _";
                        jsonBodyParams += ", let " + key;
                        jsonBodyDictString += ", \"" + key + "\": " + key;
                    }
                }

                view["jsonBodyParamsType"] = jsonBodyParamsType;
                view["jsonBodyParamsTemplate"] = jsonBodyParamsTemplate;
                view["jsonBodyParams"] = jsonBodyParams;
                view["jsonBodyDictString"] = jsonBodyDictString;
            }

            return mustache.render(template, view);
        }
    }

    function isNumber(obj) {
        return !isNaN(parseFloat(obj));
    }

    function typeForObject(obj) {
        return (isNumber(obj) ? "Int" : "String");
    }

    SwiftMoyaCodeGenerator.identifier = "com.nam.PawExtensions.SwiftMoyaCodeGenerator";
    SwiftMoyaCodeGenerator.title = "Swift (Moya)";
    SwiftMoyaCodeGenerator.fileExtension = "swift";
    SwiftMoyaCodeGenerator.languageHighlighter = "swift";

    registerCodeGenerator(SwiftMoyaCodeGenerator);
}).call(this);