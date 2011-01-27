function successTest(dice, targetNumber) {
	var cup = new DiceCup();
	cup.fill({
		6: dice
	});
	cup.roll();

	var numbers = cup.map((function(dice) {
		return dice.get('value');
	}));

	var result = {};
	result.all = numbers;
	result.min = _(numbers).min();
	result.max = _(numbers).max();
	result.successes = _(numbers).select((function(num) {
		return num >= targetNumber;
	}));
	return result;
}

var result = successTest(10, 5);
console.log(result);
