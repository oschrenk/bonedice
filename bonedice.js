var Dice = Backbone.Model.extend({
	defaults: {
		sides: 6
	},
	roll: function() {
		this.set({
			value: Math.round(Math.random() * this.get('sides')) % this.get('sides') + 1
		});
		return this.get('value');
	}
});

var DiceCup = Backbone.Collection.extend({
	model: Dice,
	comparator: function(dice) {
		return dice.get('value');
	},
	// default rethrow function, rethrows when the dice hits its max value and add new result the current value
	rethrow: function(dice) {
		if (isNaN(dice.get('value'))) return false;
		if (dice.get('sides') == dice.get('value')) return true;
		return false;
	},
	roll: function() {
		this.each((function(dice) {
			var value = dice.roll();
			if (this.rethrow(dice)) {
				value += dice.roll();
			}
			dice.set({
				'value': value
			});
		}), this);
		this.sort({
			silent: true
		});
	},
	fill: function(o) {
		this.remove(this.models, {
			silent: true
		});
		for (var key in o) {
			var v = o[key];
			for (var i = 0; i < v; i++) {
				this.add(new Dice({
					'sides': key
				}));
			}
		}
	}
});
