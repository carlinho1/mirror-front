"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {

    const [products, setProducts] = useState<any[]>([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [selectedSize, setSelectedSize] = useState("");

    const [selectedGender, setSelectedGender] = useState("");


        // STEP 3
    // RESET PRODUCTS WHEN FILTER CHANGES

    useEffect(() => {

        setProducts([]);

        setPage(1);

        setHasMore(true);

    }, [selectedGender, selectedSize]);


    // STEP 4
    // LOAD PRODUCTS

    useEffect(() => {

        loadProducts();

    }, [page, selectedGender, selectedSize]);


async function loadProducts() {

    try {

        const res = await fetch(
            `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}`,
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


//     async function loadProducts() {

//         try {

//             // const res = await fetch(
//             //     `http://192.168.20.2:3001/products?page=${page}`,
//             //     {
//             //         cache: "no-store"
//             //     }
//             // );

//             const res = await fetch(
//                 `http://192.168.20.2:3001/products?page=${page}&gender=${selectedGender}&size=${selectedSize}`,
//                 {
//                     cache: "no-store"
//                 }
// );

//             const data = await res.json();

//             // SI YA NO HAY MÁS PRODUCTOS
//             if (!data.length) {

//                 setHasMore(false);

//                 return;
//             }

//             // AGREGAR PRODUCTOS NUEVOS
//             // setProducts((prev) => [...prev, ...data]);
//             setProducts(prev => {

//                 const allProducts = [...prev, ...data];

//                 const uniqueProducts = allProducts.filter(
//                     (product, index, self) =>
//                         index === self.findIndex(p => p.id === product.id)
//                 );

//                 return uniqueProducts;
//             });

//             // SIGUIENTE PÁGINA
//             setPage((prev) => prev + 1);

//         } catch (error) {

//             console.log(error);
//         }
//     }

    // CARGA INICIAL
    // useEffect(() => {

    //     loadProducts();

    // }, []);



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


                        {products

                            // .filter((product: any) => {

                            //     if (!selectedSize) {
                            //         return true;
                            //     }

                            //     return product.variants?.some(
                            //         (v: any) =>
                            //             v.available &&
                            //             v.size === selectedSize
                            //     );
                            // })

                            .filter((product: any) => {



                                
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

                            return matchesSize && matchesGender;
                        })

                            .map((product: any) => {


    const firstNames = [

        "Urban",
        "Shadow",
        "Nova",
        "Velocity",
        "Quantum",
        "Motion",
        "Street",
        "Elite",
        "Vision",
        "Fusion",
        "Dynamic",
        "Apex",
        "Vertex",
        "Legacy",
        "Prime",
        "Vortex",
        "Neo",
        "Storm",
        "Pulse",
        "Titan",
        "Infinity",
        "Orbit",
        "Matrix",
        "Ignite",
        "Blaze",
        "Rush",
        "Turbo",
        "Hyper",
        "Zenith",
        "Sonic",
        "Volt",
        "Royal",
        "Astral",
        "Cyber",
        "Gravity",
        "Altitude",
        "Core",
        "Rapid",
        "Chrome",
        "Drift"
    ];

    const secondNames = [

        "Runner",
        "Flex",
        "Mode",
        "Force",
        "Wave",
        "Edge",
        "Fly",
        "Boost",
        "Flow",
        "Drive",
        "Sprint",
        "Vision",
        "Motion",
        "Pulse",
        "Strike",
        "Storm",
        "Impact",
        "X",
        "Pro",
        "Max",
        "Elite",
        "Prime",
        "React",
        "Fusion",
        "Shift",
        "Nova",
        "Air",
        "Energy",
        "One",
        "Core",
        "Velocity",
        "Infinity",
        "Power",
        "Light",
        "Jump",
        "ForceX",
        "Nitro",
        "WaveX",
        "Rush",
        "Flyer"
    ];

    const thirdNames = [

        "Silver",
        "Gold",
        "Carbon",
        "Steel",
        "Ghost",
        "Phantom",
        "Shadow",
        "Ice",
        "Fire",
        "Volt",
        "Thunder",
        "Night",
        "Sky",
        "Cloud",
        "Stone",
        "Graphite",
        "Neon",
        "Flame",
        "Titanium",
        "Crystal",
        "Obsidian",
        "Arctic",
        "Inferno",
        "Ocean",
        "Midnight",
        "Pearl",
        "Smoke",
        "Lunar",
        "Solar",
        "Emerald",
        "Ruby",
        "Onyx",
        "Ivory",
        "Storm",
        "Frost",
        "Platinum"
    ];

    const fakeName =

        firstNames[
            product.id % firstNames.length
        ]

        + " " +

        secondNames[
            product.id % secondNames.length
        ]

        + " " +

        thirdNames[
            product.id % thirdNames.length
        ]

        + " " +

        product.id.toString().slice(-4);


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
                                        className="w-full aspect-square object-cover rounded-xl"
                                    />

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

                                                // <div
                                                //     key={size}
                                                //     className="border px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm"
                                                // >
                                                //     {size}
                                                // </div>
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

        </main>
    );
}