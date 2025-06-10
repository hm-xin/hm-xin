tailwind.config = {
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#fff7ed",
					100: "#ffedd5",
					200: "#fed7aa",
					300: "#fdba74",
					400: "#fb923c",
					500: "#f97316",
					600: "#ea580c",
					700: "#c2410c",
					800: "#9a3412",
					900: "#7c2d12",
				},
			},
			animation: {
				"fade-in": "fadeIn 0.6s ease-in-out",
				"slide-up": "slideUp 0.8s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
};

// Enhanced Theme Management System
class ThemeManager {
	constructor() {
		this.themes = ["light", "dark", "system"];
		this.currentTheme = this.getStoredTheme();
		this.init();
	}

	init() {
		// Apply theme immediately to prevent flash
		this.applyTheme(this.currentTheme);

		// Set up event listeners
		document.addEventListener("DOMContentLoaded", () => {
			this.updateThemeControls();
			this.setupSystemThemeListener();
		});
	}

	getStoredTheme() {
		return localStorage.getItem("theme") || "system";
	}

	getSystemTheme() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}

	getEffectiveTheme(theme = this.currentTheme) {
		return theme === "system" ? this.getSystemTheme() : theme;
	}

	applyTheme(theme) {
		const effectiveTheme = this.getEffectiveTheme(theme);
		document.documentElement.classList.toggle(
			"dark",
			effectiveTheme === "dark"
		);
	}

	setTheme(theme) {
		if (!this.themes.includes(theme)) return;

		this.currentTheme = theme;
		localStorage.setItem("theme", theme);
		this.applyTheme(theme);
		this.updateThemeControls();
	}

	toggleTheme() {
		const currentEffective = this.getEffectiveTheme();
		const newTheme = currentEffective === "dark" ? "light" : "dark";
		this.setTheme(newTheme);
	}

	updateThemeControls() {
		// Update dropdown
		const select = document.getElementById("theme-select");
		if (select) {
			select.value = this.currentTheme;
		}

		// Update toggle button icons
		this.updateThemeIcon();
	}

	updateThemeIcon() {
		const isDark = this.getEffectiveTheme() === "dark";
		const sunIcon = document.getElementById("sun-icon");
		const moonIcon = document.getElementById("moon-icon");

		if (sunIcon && moonIcon) {
			sunIcon.style.display = isDark ? "block" : "none";
			moonIcon.style.display = isDark ? "none" : "block";
		}
	}

	setupSystemThemeListener() {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", () => {
				if (this.currentTheme === "system") {
					this.applyTheme("system");
					this.updateThemeIcon();
				}
			});
	}
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Global functions for HTML event handlers
function changeTheme(value) {
	themeManager.setTheme(value);
}

function toggleTheme() {
	themeManager.toggleTheme();
}
