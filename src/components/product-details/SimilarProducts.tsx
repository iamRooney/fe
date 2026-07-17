import Image from "next/image";
import Link from "next/link";

const similarProducts = [
  {
    id: 1,
    slug: "arduino-uno-r3",
    name: "Arduino Uno R3",
    image: "/images/products/product-1.jfif",
    price: "₹1,250",
  },
  {
    id: 2,
    slug: "arduino-nano",
    name: "Arduino Nano",
    image: "/images/products/product-2.jfif",
    price: "₹850",
  },
  {
    id: 3,
    slug: "arduino-leonardo",
    name: "Arduino Leonardo",
    image: "/images/products/product-3.jfif",
    price: "₹2,150",
  },
  {
    id: 4,
    slug: "arduino-micro",
    name: "Arduino Micro",
    image: "/images/products/product-4.jfif",
    price: "₹1,850",
  },
];

export default function SimilarProducts() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between text-gray-500">
        <h2 className="text-3xl font-bold">Similar Products</h2>

        <Link
          href="/products"
          className="text-gray-500 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {similarProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group rounded-lg border p-4 transition hover:shadow-lg text-gray-500"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-3 transition group-hover:scale-105"
              />
            </div>

            <h3 className="line-clamp-2 text-sm font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-lg font-bold text-orange-600">
              {product.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}