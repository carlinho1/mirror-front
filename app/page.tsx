"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {

    const [products, setProducts] = useState<any[]>([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [selectedSize, setSelectedSize] = useState("");

    const [selectedGender, setSelectedGender] = useState("");

    const [selectedColor, setSelectedColor] = useState("");

    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const [selectedImage, setSelectedImage] = useState(0);

        // STEP 3
    // RESET PRODUCTS WHEN FILTER CHANGES

    useEffect(() => {

        setProducts([]);

        setPage(1);

        setHasMore(true);

    }, [selectedGender, selectedSize, selectedColor]);


    // STEP 4
    // LOAD PRODUCTS

    useEffect(() => {

        loadProducts();

    }, [page, selectedGender, selectedSize, selectedColor]);


async function loadProducts() {

    try {

        const res = await fetch(
            `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}&color=${selectedColor}`,
            {
                cache: "no-store"
            }
        );  

        const data = await res.json();

        // SI YA NO HAY MÁS PRODUCTOS
        if (!data.length) {

            setHasMore(false);

            return;
        }

        // AGREGAR PRODUCTOS NUEVOS
        setProducts(prev => {

            const allProducts = [...prev, ...data];

            // ELIMINAR DUPLICADOS
            const uniqueProducts = allProducts.filter(
                (product, index, self) =>
                    index === self.findIndex(
                        p => p.id === product.id
                    )
            );

            // 🔥 ORDENAR POR PRECIO
            uniqueProducts.sort(
                (a, b) => a.price_cop - b.price_cop
            );

            return uniqueProducts;
        });

        // SIGUIENTE PÁGINA
        setPage((prev) => prev + 1);

    } catch (error) {

        console.log(error);
    }
}



    return (

        <main className="p-4 md:p-10 bg-gray-100 min-h-screen">

            <div className="max-w-7xl mx-auto">

            <h2 className="text-xl font-bold mb-4 mt-8">
                Filtra por género
            </h2>

            <div className="flex gap-2 mb-10">

                {[
                    "Hombre",
                    "Mujer"
                ].map((gender) => (

                    <button
                        key={gender}

                        onClick={() =>
                            setSelectedGender(
                                selectedGender === gender
                                    ? ""
                                    : gender
                            )
                        }

                        className={`
                            px-4
                            py-2
                            rounded-xl
                            border
                            transition

                            ${
                                selectedGender === gender
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }
                        `}
                    >
                        {gender}
                    </button>
                ))}

            </div>



                <h1 className="text-3xl md:text-4xl font-bold mb-8">
                    Node
                </h1>

                <h2 className="text-xl font-bold mb-4">
                    Filtra por tu talla
                </h2>

                <div className="flex flex-wrap gap-2 mb-8">

                    {[
                        "6",
                        "6.5",
                        "7",
                        "7.5",
                        "8",
                        "8.5",
                        "9",
                        "9.5",
                        "10",
                        "10.5",
                        "11",
                        "11.5",
                        "12"
                    ].map((size) => (

                        <button
                            key={size}

                            onClick={() =>
                                setSelectedSize(
                                    selectedSize === size ? "" : size
                                )
                            }

                            className={`
                                px-4
                                py-2
                                rounded-xl
                                border
                                transition

                                ${
                                    selectedSize === size
                                        ? "bg-black text-white"
                                        : "bg-white"
                                }
                            `}
                        >
                            {size}
                        </button>
                    ))}

                </div>









<h2 className="text-xl font-bold mb-4">
    Filtra por color
</h2>



<div className="flex flex-wrap gap-2 mb-8">

    {[
        "Black",
        "White",
        "Beige",
        "Blue",
        "Red",
        "Green",
        "Grey"
    ].map((color) => (

        <button
            key={color}

            onClick={() =>
                setSelectedColor(
                    selectedColor === color
                        ? ""
                        : color
                )
            }

            className={`
                px-4
                py-2
                rounded-xl
                border
                transition

                ${
                    selectedColor === color
                        ? "bg-black text-white"
                        : "bg-white"
                }
            `}
        >
            {color}
        </button>

    ))}

</div>











                <InfiniteScroll
                    dataLength={products.length}
                    next={loadProducts}
                    hasMore={hasMore}
                    loader={
                        <p className="text-center py-10 text-lg">
                            Cargando...
                        </p>
                    }
                    endMessage={
                        <p className="text-center py-10 text-gray-500">
                            No hay más productos
                        </p>
                    }
                >

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                        {/* {products.map((product: any) => { */}


                        {products.filter((product: any) => {

                            // FILTRO TALLA

                            const matchesSize = !selectedSize ||

                                product.variants?.some(
                                    (v: any) =>
                                        v.available &&
                                        v.size === selectedSize
                                );

                            // FILTRO GÉNERO

                            const matchesGender = !selectedGender ||

                                product.gender === selectedGender;


                            const colorTag = product.tags?.find(
                                (tag:string)=>
                                    tag.includes("Color::")
                            );

                            const productColors = colorTag
                                ?.split("Color::")[1]
                                ?.split("/")
                                ?.map(
                                    (c:string)=>
                                        c.trim()
                                );

                            const matchesColor =
                                !selectedColor ||

                                productColors?.includes(
                                    selectedColor
                                );


                            return matchesSize && matchesGender && matchesColor;

                        })

                            .map((product: any) => {


                                const firstNames = [
                                "Palermo",
                                "Slipstream",
                                "Suede",
                                "Clyde",
                                "Teveris",
                                "Spirex",
                                "Morphic",
                                "Trinity",
                                "Caven",
                                "Pacer",
                                "Electron",
                                "Mirage",
                                "Velophasis",
                                "Rider",
                                "Hypnotic",
                                "Future",
                                "Plexus",
                                "R698",
                                "TRC",
                                "RS-X",
                                "Court",
                                "Blaze",
                                "Indoor",
                                "GV",
                                "CA"
                            ];

                            const secondNames = [
                                "NITRO",
                                "Speed",
                                "Fusion",
                                "Retro",
                                "Sport",
                                "Classic",
                                "Premium",
                                "Street",
                                "Tech",
                                "Racer",
                                "Athletic",
                                "Garage",
                                "Performance",
                                "Track",
                                "Runner",
                                "Motion",
                                "Heritage",
                                "Vintage",
                                "Lux",
                                "Drift",
                                "Tokyo",
                                "NYC",
                                "Summer",
                                "Garage",
                                "Cat",
                                "Style",
                                "Wave",
                                "Club",
                                "Base",
                                "Remix"
                            ];

                            const thirdNames = [
                                "Palermo",
                                "Nitro",
                                "Trinity",
                                "Suede",
                                "Clyde",
                                "Speedfusion",
                                "Mirage",
                                "Slipstream",
                                "Pacer",
                                "Morphic",
                                "Velophasis",
                                "Hypnotic",
                                "Future",
                                "Blaze",
                                "Rider",
                                "Court",
                                "R698",
                                "Indoor",
                                "CA",
                                "GV",
                                "Electron",
                                "Spirex",
                                "Playmaker",
                                "Thunder",
                                "Nova",
                                "Caven"
                            ];

                            const fakeName =
                                firstNames[
                                    product.id % firstNames.length
                                ] + " " +

                                secondNames[
                                    Math.floor(product.id / 3) % secondNames.length
                                ] + " " +

                                thirdNames[
                                    Math.floor(product.id / 7) % thirdNames.length
                                ]


                            const availableSizes = product.variants
                                ?.filter((v: any) => v.available)
                                ?.map((v: any) => v.size);

                            return (

                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl shadow p-3 md:p-4"
                                >

<img
    src={product.image}
    alt={fakeName}
    className="
        w-full
        aspect-square
        object-cover
        rounded-xl
        cursor-pointer
    "
    onClick={() => {

        setSelectedProduct(product);

        setSelectedImage(0);

    }}
/>










<div className="flex justify-between mt-4">

    <button
        onClick={() =>
            setSelectedImage(prev =>
                Math.max(prev - 1, 0)
            )
        }
    >
        ← Anterior
    </button>

    <button
        onClick={() =>
            setSelectedImage(prev =>
                Math.min(
                    prev + 1,
                    selectedProduct.images.length - 1
                )
            )
        }
    >
        Siguiente →
    </button>

</div>














                                    <h2 className="font-bold mt-4 text-sm md:text-lg leading-tight">
                                        {fakeName}
                                    </h2>







                                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                                        {product.vendor}
                                    </p>


                                    <div className="mt-2 inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
                                        {product.gender}
                                    </div>

                                    <p className="text-lg md:text-2xl font-bold mt-4">

                                        $ {
                                            (
                                                Math.ceil(
                                                    product.price_cop / 1000
                                                ) * 1000
                                            ).toLocaleString("es-CO")
                                        } COP

                                    </p>

                                    <div className="mt-4">

                                        <p className="font-semibold text-xs md:text-sm mb-2">
                                            Tallas Disponibles
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {availableSizes?.map((size: string) => (

                                                <a
                                                    key={size}

                                                    href={`https://wa.me/573207995500?text=${encodeURIComponent(

                                                        `Hola, quiero este producto: ${fakeName}, REF: ${product.id}, Talla: ${size}, Precio: $${(Math.ceil(product.price_cop / 1000) * 1000).toLocaleString("es-CO")} COP`)}`}

                                                    target="_blank"

                                                    className="
                                                        border
                                                        px-2
                                                        md:px-3
                                                        py-1
                                                        rounded-lg
                                                        text-xs
                                                        md:text-sm
                                                        hover:bg-black
                                                        hover:text-white
                                                        transition
                                                        cursor-pointer
                                                    "
                                                >
                                                    {size}
                                                </a>        
                                            ))}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </InfiniteScroll>

            </div>










{selectedProduct && (

    <div
        className="
            fixed
            inset-0
            bg-black/80
            z-50
            flex
            items-center
            justify-center
            p-4
        "
        onClick={() => setSelectedProduct(null)}
    >

        <div
            className="
                bg-white
                rounded-2xl
                max-w-4xl
                w-full
                p-4
            "
            onClick={(e) => e.stopPropagation()}
        >

            <img
                src={
                    selectedProduct.images?.[selectedImage]?.url ||
                    selectedProduct.image
                }
                className="
                    w-full
                    max-h-[70vh]
                    object-contain
                    rounded-xl
                "
            />

            <div className="flex gap-2 mt-4 overflow-x-auto">

                {(selectedProduct.images?.length
                    ? selectedProduct.images
                    : [{ url: selectedProduct.image }]
                ).map((img:any, index:number) => (

                    <img
                        key={index}
                        src={img.url}
                        onClick={() =>
                            setSelectedImage(index)
                        }
                        className={`
                            w-20
                            h-20
                            object-cover
                            rounded-lg
                            cursor-pointer
                            border-2
                            ${
                                selectedImage === index
                                    ? "border-black"
                                    : "border-transparent"
                            }
                        `}
                    />

                ))}

            </div>

            <button
                onClick={() => setSelectedProduct(null)}
                className="
                    mt-4
                    px-4
                    py-2
                    bg-black
                    text-white
                    rounded-xl
                "
            >
                Cerrar
            </button>

        </div>

    </div>

)}









        </main>
    );
}