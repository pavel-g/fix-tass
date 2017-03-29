var Esprima = require('esprima');
var Escodegen = require('escodegen');
var JSPath = require('jspath');

function GetFixedCode() {
	return Esprima.parse('console.log("Предотвращено исполнение плохого кода");').body[0];
}

function FixOverclockers(script) {
	var parsed = Esprima.parse(script);
	var filter = '..{.type === "BlockStatement" && .body{.expression.arguments{.value *== "Мы определили, что вы используете систему удаления рекламы"}}}';
	var exprs = JSPath.apply(filter, parsed);
	var changes = false;
	if (exprs && exprs.length > 0) {
		var i, expr;
		for ( i = 0; i < exprs.length; i++ ) {
			expr = exprs[i];
			expr.body.length = 0;
			expr.body.push(GetFixedCode());
			changes = true;
		}
	}
	if (changes) {
		return Escodegen.generate(parsed)
	} else {
		return null;
	}
}

FixOverclockers.GetFixedCode = GetFixedCode;

module.exports = FixOverclockers;
