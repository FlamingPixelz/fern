import { speciesInfo } from "./plantData"

export function parseLastWateredDate(value) {
	if (!value) return { date: null, warning: "" };
	if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
		return { date: null, warning: "Use dd/mm/yyyy format." };
	}

	const [day, month, year] = value.split("/").map(Number);
	const date = new Date(year, month - 1, day);
	const isRealDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

	if (!isRealDate) {
		return { date: null, warning: "Enter a real calendar date." };
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (date > today) {
		return { date: null, warning: "Last watered cannot be after today." };
	}

	return { date, warning: "" };
}

export function getDaysSince(date) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	return Math.floor((today - date) / (1000 * 60 * 60 * 24))
}

export function formatDate(date) {
	const day = String(date.getDate()).padStart(2, "0")
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

export function deriveLastWatered(interval, nextWaterDays) {
	if (!Number.isFinite(interval) || !Number.isFinite(nextWaterDays)) return "";

	const date = new Date();
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() - (interval - nextWaterDays));

	return formatDate(date);
}
export function parseFrequencyRange(species) {
	const fallback = [1, 30];
	if (!(species in speciesInfo)) return fallback
	const recommendation = speciesInfo[species].recommendedFrequency;

	const match = recommendation.match(/(\d+)\s*-\s*(\d+)/);
	if (!match) return fallback;

	return [Number(match[1]), Number(match[2])];
}