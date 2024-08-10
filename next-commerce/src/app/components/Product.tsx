import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import AddCart from './AddCart'
import Link from "next/link";

type ProductProps = {
    product: ProductType
}
export default function Product({product} : ProductProps) {
    return (
        <Link href={`/product/${product.id}`}>
        <div className="flex flex-col shadow-lg h-80 bg-slate-800 p-4 text-gray-300" >
            <div className="relative max-h-72 flex-1">
                <ProductImage product={product} fill />
            </div>
            <div className="flex flex-col font-bold my-3">
                <p className="w-40 truncate">
                    {product.name}
                </p>
                <p className="text-md text-teal-300">
                    {formatPrice(product.price)}
                </p>
            </div>
            <AddCart product = {product} />
        </div>
        </Link>
    )
}
