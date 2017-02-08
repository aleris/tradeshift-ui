describe('ts.ui.AsideSpirit', function likethis() {
	var MARKUP = '<aside data-ts="Aside" data-ts.title="Test Aside"><div data-ts="Panel"></div></aside>';
	var TRANSITION_DONE = (ts.ui.TRANSITION_FAST + 100);

	it('should (eventually) channel via ts-attribute', function(done) {
		var spirit, dom = helper.createTestDom();
		dom.innerHTML = MARKUP;
		sometime(function later() {
			spirit = ts.ui.get(dom.querySelector('aside'));
			expect(ts.ui.AsideSpirit.is(spirit)).toBe(true);
			spirit.dom.remove();
			done();
		});
	});

	it('should fail spectacularly when an open aside is nuked', function(done) {
		var spirit, dom = helper.createTestDom();
		dom.innerHTML = MARKUP;
		sometime(function later() {
			spirit = ts.ui.get(dom.querySelector('aside'));
			spirit.open();
			sometime(function muchlater() {
				try {
					spirit.dom.remove();
					expect('this should not be evaluated').toBe(true);
				} catch (exception) {
					expect(exception).not.toBe(null);	
				}
				done();
			}, 1000);
		});
	});

	/*
	 * TODO: Test that Asides can also close, but now like this
	 *
	describe('a broadcast close', function() {
		beforeEach(function(done) {
			var that = this;
			var dom = helper.createTestDom();
			dom.innerHTML = '<aside data-ts="Aside"><div data-ts="Panel"></div></aside>';
			sometime(function later() {
				that.spirit = ts.ui.get(dom.querySelector('[data-ts=Aside]'));
				expect(that.spirit.constructor).toBe(ts.ui.AsideSpirit);
				done();
			});
		});
		it('(should first evaluate open and onopened)', function(done) {
			var spirit = this.spirit, onopen = false, onopened = false;
			spirit.onopen = function() {
				onopen = true;
			};
			spirit.onopened = function() {
				onopened = true;
				expect(onopen && onopened).toBe(true);
				closeAside(spirit, done);
			};
			spirit.open();
		});
		it('closes the aside', function(done) {
			var spirit = this.spirit;
			spirit.open();
			setTimeout(function() {
				gui.Broadcast.dispatchGlobal(ts.ui.BROADCAST_GLOBAL_ASIDES_DO_CLOSE);
				setTimeout(function() {
					expect(spirit.isOpen).toBe(false);
					done();
				}, TRANSITION_DONE);
			}, TRANSITION_DONE);
		});
	});
	
	describe('a broadcast close to an aside in a drawer', function() {
		beforeEach(function(done) {
			var that = this;
			var dom = helper.createTestDom();
			dom.innerHTML =
				'<aside data-ts="SideBar">' +
					'<div data-ts="Panel"></div>' +
					'<aside data-ts="Aside"><div data-ts="Panel"></div></aside>' +
				'</aside>';
			sometime(function later() {
				that.spirit = ts.ui.get(dom.querySelector('[data-ts=Aside]'));
				expect(that.spirit.constructor).toBe(ts.ui.AsideSpirit);
				that.spirit.onopened = done;
				that.spirit.open();
			});
		});

		afterEach(function(done) {
			this.spirit.onclosed = done;
			this.spirit.close();
		});

		it('ignores broadcasts', function(done) {
			var spirit = this.spirit;
			setTimeout(function() {
				gui.Broadcast.dispatchGlobal(ts.ui.BROADCAST_GLOBAL_ASIDES_DO_CLOSE);
				setTimeout(function() {
					expect(spirit.isOpen).toBe(true);
					closeAside(spirit, done);
				}, TRANSITION_DONE);
			}, TRANSITION_DONE);
		});
	});
	*/
});