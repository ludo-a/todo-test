/*global NodeList */

/**
 * export all functions to view.js and app.js
 * 
 * @param {string} selector the element selected
 * @param {string} scope the element selected
 */
	// Get element(s) by CSS selector:
	export function qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}
	export function qsa(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}

	// addEventListener wrapper:
	export function $on(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	export function $delegate(target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		$on(target, type, dispatchEvent, useCapture);
	}

	// Find the element's parent with the given tag name:
	// $parent(qs('a'), 'div');
	export function $parent(element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return $parent(element.parentNode, tagName);
	}

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;

