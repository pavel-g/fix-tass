var Esprima = require('esprima');
var Escodegen = require('escodegen');
var JSPath = require('jspath');

function FixTassJs(content) {
	
	var parsed = Esprima.parse(content);
	var filter = FixTassJs.filter;
	var expr = JSPath.apply(filter, parsed);
	
	expr.expression.right = FixTassJs.emptyFnSyntaxItem;
	
	return Escodegen.generate(parsed);
	
}

FixTassJs.filter = '.body{.expression.left.object.name === "TASS" && .expression.left.property.name === "copyText"}[0]';

FixTassJs.emptyFnSyntaxItem = {
	"type": "FunctionExpression",
	"id": null,
	"params": [],
	"body": {
		"type": "BlockStatement",
		"body": []
	},
	"generator": false,
	"expression": false
};

module.exports = FixTassJs;
