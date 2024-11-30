import axiosInstance from "../../../../api/axiosInstance";
import { fetchProducts, fetchProductById } from "../productService";

jest.mock("../../../../api/axiosInstance");

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("productService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchProducts", () => {
        test("should fetch and return a list of products", async () => {
            const mockProducts = [
                { id: 1, name: "Product 1", price: 50 },
                { id: 2, name: "Product 2", price: 75 },
            ];
            mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

            const products = await fetchProducts();

            expect(axiosInstance.get).toHaveBeenCalledWith("/products");
            expect(products).toEqual(mockProducts);
        });

        test("should throw an error when API call fails", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(fetchProducts()).rejects.toThrow("Network Error");
        });
    });

    describe("fetchProductById", () => {
        test("should fetch and return a product by ID", async () => {
            const mockProduct = { id: 1, name: "Product 1", price: 50 };
            mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

            const product = await fetchProductById(1);

            expect(axiosInstance.get).toHaveBeenCalledWith("/products/1");
            expect(product).toEqual(mockProduct);
        });

        test("should throw an error when API call fails", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(fetchProductById(1)).rejects.toThrow("Network Error");
        });
    });
});