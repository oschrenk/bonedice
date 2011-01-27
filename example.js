var DiceThrow = Backbone.Model.extend({});

function successTest(dice, targetNumber) {
	var cup = new DiceCup();
	cup.fill({
		6: dice
	});
	cup.roll();

	var numbers = cup.map((function(dice) {
		return dice.get('value');
	}));

	var diceThrow = new DiceThrow;
	diceThrow.set({
		'all': numbers,
		'min': _(numbers).min(),
		'max': _(numbers).max(),
		'successes': _(numbers).select((function(num) {
			return num >= targetNumber;
		}))

	});

	return diceThrow;
}

var result = successTest(10, 5);
console.log(result);
