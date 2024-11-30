import { convertPrice } from "../currencyUtils";

describe("currencyUtils", () => {
    test("should convert price to USD correctly", () => {
        const priceInUSD = 100;
        const convertedPrice = convertPrice(priceInUSD, "USD");
        expect(convertedPrice).toBe(100); // USD rate is 1
    });

    test("should convert price to EUR correctly", () => {
        const priceInUSD = 100;
        const convertedPrice = convertPrice(priceInUSD, "EUR");
        expect(convertedPrice).toBe(90); // EUR rate is 0.9
    });

    test("should convert price to TRY correctly", () => {
        const priceInUSD = 100;
        const convertedPrice = convertPrice(priceInUSD, "TRY");
        expect(convertedPrice).toBe(3000); // TRY rate is 30
    });
});