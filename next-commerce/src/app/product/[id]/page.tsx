import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types/ProductType";
import Stripe from "stripe";
import Product from "@/app/components/Product";
type ProductPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
  });
  const produto = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: produto.id,
  });

  return {
    id: produto.id,
    price: price.data[0].unit_amount,
    name: produto.name,
    image: produto.images[0],
    description: produto.description,
    currency: price.data[0].currency,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchRecommendedProducts(excludeProductId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
  });

  const { data: products } = await stripe.products.list({
    limit: 50,
  });

  const filteredProducts = products.filter(
    (product) => product.id !== excludeProductId
  );

  const shuffledProducts = shuffleArray(filteredProducts);
  const randomProducts = shuffledProducts.slice(0, 4);

  const productsWithPrices = await Promise.all(
    randomProducts.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });

      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      };
    })
  );

  return productsWithPrices;
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  const recommendedProducts = await fetchRecommendedProducts(id);

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <ProductImage product={product} />
        <div className="flex flex-col">
          <div className="pb-4">
            <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
            <h2 className="text-xl text-teal-600 font-bold">
              {formatPrice(product.price)}
            </h2>
          </div>
          <div className="pb-4">
            <p className="text-sm text-gray-400">{product.description}</p>
          </div>
          <AddCart product={product} />
        </div>
      </div>

      <div className="py-10">
        <h2 className="text-2xl font-bold text-gray-300 mb-6">
          Outros Produtos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((recProduct: ProductType) => (
            <Product key={recProduct.id} product={recProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
