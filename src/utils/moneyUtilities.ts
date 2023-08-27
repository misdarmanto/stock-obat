interface ICalculateDiscountModel {
	originalPrice: number;
	discountPercentage: number;
}

export function calculateDiscountPrice({
	originalPrice,
	discountPercentage,
}: ICalculateDiscountModel) {
	if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
		return "Invalid input. Please enter valid values.";
	}

	const discountAmount = (originalPrice * discountPercentage) / 100;
	const discountedPrice = originalPrice - discountAmount;
	return discountedPrice;
}

export function convertToIDRFormat(price: number | any) {
	return price
		.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
		.slice(0, -3);
}
