var Global = function(elements) {
	this.eList = Array.from(document.querySelectorAll(elements));
}

Global.prototype.addClass = function(newClass) {
	if (typeof newClass !== 'string') {
		this.eList.map(function(el, ind) {
			let fn = newClass.call(el, ind, el.className);
			return el.className += ` ${fn}`;
		});
	} else this.eList.map((el) => el.className += ` ${newClass}`);
}	

Global.prototype.append = function(node) {
	if (typeof node === 'object') {
		this.eList.forEach((el) => {
            let newEl = node.cloneNode(1)
                el.appendChild(newEl);
            });
	}

	if (typeof node === 'string') {
		this.eList.map((el) => el.innerHTML = node);
	}
} 

Global.prototype.html = function(arg) {
	if (!arg) {
		return this.eList[0].innerHTML;
	} else this.eList.map((el) => el.innerHTML = arg);
}

Global.prototype.attr = function(name, value) {
	if (!value) return this.eList[0].getAttribute(name);
	else this.eList.map((el) => el.setAttribute(name, value))
}

Global.prototype.children = function(value) {
	if (!value) return this.eList[0].children
	else return Array.from(this.eList[0].children).filter((el) => el.matches(value));
}

Global.prototype.css = function(name) {
	if (typeof name === 'string') {
		return this.eList[0].style.getPropertyValue(name);
	}
	else {
		for (key in name) {
			this.eList.forEach((el) => el.style[key] = name[key]);
		}
	}
}

Global.prototype.data = function(key, value) {
	if (arguments.length === 0) return this.eList[0].dataset;
	else if (typeof key === 'string' && !(value)) return this.eList[0].dataset[key];
	else  if (typeof key === 'string' && value) this.eList.forEach((el) => el.dataset[key] = value);
	else this.eList.forEach((el) => {
		for (val in key) {
			el.dataset[val] = key[val];
		}
	});
}

Global.prototype.on = function(type, selector, event) {
	if (typeof selector !== "string") this.eList.forEach((el) => {
		el.addEventListener(type, selector); 
		return selector()
	});
	else {
		this.eList.forEach((el) => {
			el.addEventListener(type, (fn) => {
				if (fn.target.matches(selector)) return event();                   
			})
		});
	}
}

Global.prototype.one = function(type, selector, event) { 
	this.on(type, selector, event);
	this.eList.forEach((el) => el.removeEventListener(type, selector))
}

Global.prototype.each = function(fn) {
	for (let i = 0; i < this.eList.length; i++) {
		if (fn.call(this.eList[i], i, this.eList[i]) === false) break
	}
	return this;
}

window.$ = function (domEl) {
    return new Global(domEl);
}