// hero word: types, pauses, deletes, then writes the next word
(function () {
	const words = [
		"DEVELOPER",
		"BUILDER",
		"FULL-STACK",
		"PROGRAMMER",
		"PROBLEM SOLVER",
	];
	const el = document.getElementById("word");
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
		el.textContent = words[0];
		return;
	}
	let w = 0,
		c = 0,
		del = false;
	function tick() {
		const word = words[w];
		el.textContent = word.slice(0, c);
		let delay = del ? 55 : 110;
		if (!del && c === word.length) {
			del = true;
			delay = 1600;
		} else if (del && c === 0) {
			del = false;
			w = (w + 1) % words.length;
			delay = 350;
		} else c += del ? -1 : 1;
		setTimeout(tick, delay);
	}
	setTimeout(tick, 400);
})();

// marquee
document.getElementById("mq").innerHTML =
	"HTML &nbsp;✦&nbsp; CSS &nbsp;✦&nbsp; JavaScript &nbsp;✦&nbsp; PHP &nbsp;✦&nbsp; Node.js &nbsp;✦&nbsp; MySQL &nbsp;✦&nbsp; Git &nbsp;✦&nbsp; Bootstrap &nbsp;✦&nbsp; ".repeat(
		4,
	);

// typing terminal
const lines = [
	'<span class="c">// developer.js</span>\n',
	'<span class="k">const</span> dev = {\n',
	'  name: <span class="s">"Hamza Macabato"</span>,\n',
	'  degree: <span class="s">"BS Information Technology"</span>,\n',
	'  stack: [<span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JS"</span>, <span class="s">"PHP"</span>, <span class="s">"SQL"</span>],\n',
	'  status: <span class="s">"open to work"</span>\n',
	"};\n",
];
const out = document.getElementById("typed");
let li = 0,
	html = "";
function typeLine() {
	if (li >= lines.length) {
		out.innerHTML = html + '<span class="caret"></span>';
		return;
	}
	const raw = lines[li];
	let i = 0;
	const tick = () => {
		// reveal by whole chunks so tags stay valid
		i += 3;
		const plain = raw;
		const part = raw.slice(0, i);
		const open = (part.match(/<span/g) || []).length,
			close = (part.match(/<\/span>/g) || []).length;
		let safe = part;
		const lt = part.lastIndexOf("<"),
			gt = part.lastIndexOf(">");
		if (lt > gt) safe = part.slice(0, lt);
		const o = (safe.match(/<span/g) || []).length,
			c = (safe.match(/<\/span>/g) || []).length;
		out.innerHTML =
			html +
			safe +
			"</span>".repeat(Math.max(0, o - c)) +
			'<span class="caret"></span>';
		if (i < raw.length) setTimeout(tick, 22);
		else {
			html += raw;
			li++;
			setTimeout(typeLine, 120);
		}
	};
	tick();
}
setTimeout(typeLine, 900);

// scroll reveal
const io = new IntersectionObserver(
	(es) =>
		es.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("on");
				io.unobserve(e.target);
			}
		}),
	{ threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

// process: one step at a time, driven by scroll position
const pin = document.getElementById("pin");
const stepEls = [...document.querySelectorAll(".step")];
const dotEls = [...document.querySelectorAll("#dots i")];
const hint = document.getElementById("hint");
function updateSteps() {
	const r = pin.getBoundingClientRect();
	const total = pin.offsetHeight - window.innerHeight;
	const p = Math.min(1, Math.max(0, -r.top / total));
	const idx = Math.min(stepEls.length - 1, Math.floor(p * stepEls.length));
	const inside =
		r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
	stepEls.forEach((el, i) => {
		el.classList.toggle("on", inside && i === idx);
		el.classList.toggle("past", i < idx);
		dotEls[i].classList.toggle("on", inside && i === idx);
	});
	hint.style.opacity = idx === stepEls.length - 1 ? 0 : 1;
}
window.addEventListener("scroll", updateSteps, { passive: true });
window.addEventListener("resize", updateSteps);
updateSteps();

// counters
const co = new IntersectionObserver(
	(es) =>
		es.forEach((e) => {
			if (!e.isIntersecting) return;
			co.unobserve(e.target);
			const el = e.target,
				to = +el.dataset.to,
				suf = el.dataset.suffix || "";
			let n = 0;
			const step = () => {
				n += Math.max(1, Math.ceil(to / 40));
				if (n >= to) n = to;
				el.textContent = n + suf;
				if (n < to) requestAnimationFrame(step);
			};
			step();
		}),
	{ threshold: 0.6 },
);
document.querySelectorAll(".count").forEach((c) => co.observe(c));
