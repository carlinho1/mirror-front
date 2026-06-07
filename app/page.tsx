// "use client";

// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

// export default function Home() {

//     const [products, setProducts] = useState<any[]>([]);

//     const [page, setPage] = useState(1);

//     const [hasMore, setHasMore] = useState(true);

//     const [selectedSize, setSelectedSize] = useState("");

//     const [selectedGender, setSelectedGender] = useState("");

//     const [selectedColor, setSelectedColor] = useState("");

//     useEffect(() => {

//         setProducts([]);

//         setPage(1);

//         setHasMore(true);

//     }, [selectedGender, selectedSize, selectedColor]);


//     useEffect(() => {

//         loadProducts();

//     }, [page, selectedGender, selectedSize, selectedColor]);


// async function loadProducts() {

//     try {

//         const res = await fetch(
//             `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}&color=${selectedColor}`,
//             {
//                 cache: "no-store"
//             }
//         );  

//         const data = await res.json();

//         // SI YA NO HAY MÁS PRODUCTOS
//         if (!data.length) {

//             setHasMore(false);

//             return;
//         }

//         // AGREGAR PRODUCTOS NUEVOS
//         setProducts(prev => {

//             const allProducts = [...prev, ...data];

//             // ELIMINAR DUPLICADOS
//             const uniqueProducts = allProducts.filter(
//                 (product, index, self) =>
//                     index === self.findIndex(
//                         p => p.id === product.id
//                     )
//             );

//             // 🔥 ORDENAR POR PRECIO
//             uniqueProducts.sort(
//                 (a, b) => a.price_cop - b.price_cop
//             );

//             return uniqueProducts;
//         });

//         // SIGUIENTE PÁGINA
//         setPage((prev) => prev + 1);

//     } catch (error) {

//         console.log(error);
//     }
// }



//     return (

//         <main className="p-4 md:p-10 bg-gray-100 min-h-screen">

//             <div className="max-w-7xl mx-auto">

//             <h2 className="text-xl font-bold mb-4 mt-8">
//                 Filtra por género
//             </h2>

//             <div className="flex gap-2 mb-10">

//                 {[
//                     "Hombre",
//                     "Mujer"
//                 ].map((gender) => (

//                     <button
//                         key={gender}

//                         onClick={() =>
//                             setSelectedGender(
//                                 selectedGender === gender
//                                     ? ""
//                                     : gender
//                             )
//                         }

//                         className={`
//                             px-4
//                             py-2
//                             rounded-xl
//                             border
//                             transition

//                             ${
//                                 selectedGender === gender
//                                     ? "bg-black text-white"
//                                     : "bg-white"
//                             }
//                         `}
//                     >
//                         {gender}
//                     </button>
//                 ))}

//             </div>



//                 <h1 className="text-3xl md:text-4xl font-bold mb-8">
//                     Node
//                 </h1>

//                 <h2 className="text-xl font-bold mb-4">
//                     Filtra por tu talla
//                 </h2>

//                 <div className="flex flex-wrap gap-2 mb-8">

//                     {[
//                         "6",
//                         "6.5",
//                         "7",
//                         "7.5",
//                         "8",
//                         "8.5",
//                         "9",
//                         "9.5",
//                         "10",
//                         "10.5",
//                         "11",
//                         "11.5",
//                         "12"
//                     ].map((size) => (

//                         <button
//                             key={size}

//                             onClick={() =>
//                                 setSelectedSize(
//                                     selectedSize === size ? "" : size
//                                 )
//                             }

//                             className={`
//                                 px-4
//                                 py-2
//                                 rounded-xl
//                                 border
//                                 transition

//                                 ${
//                                     selectedSize === size
//                                         ? "bg-black text-white"
//                                         : "bg-white"
//                                 }
//                             `}
//                         >
//                             {size}
//                         </button>
//                     ))}

//                 </div>









// <h2 className="text-xl font-bold mb-4">
//     Filtra por color
// </h2>



// <div className="flex flex-wrap gap-2 mb-8">

//     {[
//         "Black",
//         "White",
//         "Beige",
//         "Blue",
//         "Red",
//         "Green",
//         "Grey"
//     ].map((color) => (

//         <button
//             key={color}

//             onClick={() =>
//                 setSelectedColor(
//                     selectedColor === color
//                         ? ""
//                         : color
//                 )
//             }

//             className={`
//                 px-4
//                 py-2
//                 rounded-xl
//                 border
//                 transition

//                 ${
//                     selectedColor === color
//                         ? "bg-black text-white"
//                         : "bg-white"
//                 }
//             `}
//         >
//             {color}
//         </button>

//     ))}

// </div>











//                 <InfiniteScroll
//                     dataLength={products.length}
//                     next={loadProducts}
//                     hasMore={hasMore}
//                     loader={
//                         <p className="text-center py-10 text-lg">
//                             Cargando...
//                         </p>
//                     }
//                     endMessage={
//                         <p className="text-center py-10 text-gray-500">
//                             No hay más productos
//                         </p>
//                     }
//                 >

//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


//                         {products



//                             .filter((product: any) => {



                                
//                             // FILTRO TALLA

//                             const matchesSize = !selectedSize ||

//                                 product.variants?.some(
//                                     (v: any) =>
//                                         v.available &&
//                                         v.size === selectedSize
//                                 );

//                             // FILTRO GÉNERO

//                             const matchesGender = !selectedGender ||

//                                 product.gender === selectedGender;


// const colorTag = product.tags?.find(
//     (tag:string)=>
//         tag.includes("Color::")
// );

// const productColors = colorTag
//     ?.split("Color::")[1]
//     ?.split("/")
//     ?.map(
//         (c:string)=>
//             c.trim()
//     );

// const matchesColor =
//     !selectedColor ||

//     productColors?.includes(
//         selectedColor
//     );


//                             return matchesSize && matchesGender && matchesColor;




//                         })

//                             .map((product: any) => {



//     const firstNames = [
//     "Palermo",
//     "Slipstream",
//     "Suede",
//     "Clyde",
//     "Teveris",
//     "Spirex",
//     "Morphic",
//     "Trinity",
//     "Caven",
//     "Pacer",
//     "Electron",
//     "Mirage",
//     "Velophasis",
//     "Rider",
//     "Hypnotic",
//     "Future",
//     "Plexus",
//     "R698",
//     "TRC",
//     "RS-X",
//     "Court",
//     "Blaze",
//     "Indoor",
//     "GV",
//     "CA"
// ];

// const secondNames = [
//     "NITRO",
//     "Speed",
//     "Fusion",
//     "Retro",
//     "Sport",
//     "Classic",
//     "Premium",
//     "Street",
//     "Tech",
//     "Racer",
//     "Athletic",
//     "Garage",
//     "Performance",
//     "Track",
//     "Runner",
//     "Motion",
//     "Heritage",
//     "Vintage",
//     "Lux",
//     "Drift",
//     "Tokyo",
//     "NYC",
//     "Summer",
//     "Garage",
//     "Cat",
//     "Style",
//     "Wave",
//     "Club",
//     "Base",
//     "Remix"
// ];

// const thirdNames = [
//     "Palermo",
//     "Nitro",
//     "Trinity",
//     "Suede",
//     "Clyde",
//     "Speedfusion",
//     "Mirage",
//     "Slipstream",
//     "Pacer",
//     "Morphic",
//     "Velophasis",
//     "Hypnotic",
//     "Future",
//     "Blaze",
//     "Rider",
//     "Court",
//     "R698",
//     "Indoor",
//     "CA",
//     "GV",
//     "Electron",
//     "Spirex",
//     "Playmaker",
//     "Thunder",
//     "Nova",
//     "Caven"
// ];

// const fakeName =
//     firstNames[
//         product.id % firstNames.length
//     ] + " " +

//     secondNames[
//         Math.floor(product.id / 3) % secondNames.length
//     ] + " " +

//     thirdNames[
//         Math.floor(product.id / 7) % thirdNames.length
//     ]


//                             const availableSizes = product.variants
//                                 ?.filter((v: any) => v.available)
//                                 ?.map((v: any) => v.size);

//                             return (

//                                 <div
//                                     key={product.id}
//                                     className="bg-white rounded-2xl shadow p-3 md:p-4"
//                                 >

//                                     <img
//                                         src={product.image}
//                                         alt={fakeName}
//                                         className="w-full aspect-square object-cover rounded-xl"
//                                     />

//                                     <h2 className="font-bold mt-4 text-sm md:text-lg leading-tight">
//                                         {fakeName}
//                                     </h2>







//                                     <p className="text-xs md:text-sm text-gray-500 mt-1">
//                                         {product.vendor}
//                                     </p>


//                                     <div className="mt-2 inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
//                                         {product.gender}
//                                     </div>

//                                     <p className="text-lg md:text-2xl font-bold mt-4">

//                                         $ {
//                                             (
//                                                 Math.ceil(
//                                                     product.price_cop / 1000
//                                                 ) * 1000
//                                             ).toLocaleString("es-CO")
//                                         } COP

//                                     </p>

//                                     <div className="mt-4">

//                                         <p className="font-semibold text-xs md:text-sm mb-2">
//                                             Tallas Disponibles
//                                         </p>

//                                         <div className="flex flex-wrap gap-2">

//                                             {availableSizes?.map((size: string) => (

//                                                 // <div
//                                                 //     key={size}
//                                                 //     className="border px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm"
//                                                 // >
//                                                 //     {size}
//                                                 // </div>
//                                                 <a
//                                                     key={size}

//                                                     href={`https://wa.me/573207995500?text=${encodeURIComponent(

//                                                         `Hola, quiero este producto: ${fakeName}, REF: ${product.id}, Talla: ${size}, Precio: $${(Math.ceil(product.price_cop / 1000) * 1000).toLocaleString("es-CO")} COP`)}`}

//                                                     target="_blank"

//                                                     className="
//                                                         border
//                                                         px-2
//                                                         md:px-3
//                                                         py-1
//                                                         rounded-lg
//                                                         text-xs
//                                                         md:text-sm
//                                                         hover:bg-black
//                                                         hover:text-white
//                                                         transition
//                                                         cursor-pointer
//                                                     "
//                                                 >
//                                                     {size}
//                                                 </a>        
//                                             ))}

//                                         </div>

//                                     </div>

//                                 </div>
//                             );
//                         })}

//                     </div>

//                 </InfiniteScroll>

//             </div>

//         </main>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const COLOR_DOTS: Record<string, string> = {
  Black: "#1a1a1a",
  White: "#f0ede8",
  Beige: "#d4b896",
  Blue: "#378add",
  Red: "#e24b4a",
  Green: "#639922",
  Grey: "#888780",
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGender, selectedSize, selectedColor]);

  useEffect(() => {
    loadProducts();
  }, [page, selectedGender, selectedSize, selectedColor]);

  async function loadProducts() {
    try {
      const res = await fetch(
        `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}&color=${selectedColor}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (!data.length) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const allProducts = [...prev, ...data];
        const uniqueProducts = allProducts.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        uniqueProducts.sort((a, b) => a.price_cop - b.price_cop);
        return uniqueProducts;
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const hasActiveFilters = selectedGender || selectedSize || selectedColor;

  const activeLabels = [
    selectedGender,
    selectedSize ? `Talla ${selectedSize}` : "",
    selectedColor,
  ].filter(Boolean);

  function clearAll() {
    setSelectedGender("");
    setSelectedSize("");
    setSelectedColor("");
  }

  const pillBase =
    "px-4 py-1.5 rounded-full border text-sm transition-all duration-150 cursor-pointer whitespace-nowrap";
  const pillInactive =
    "bg-white border-gray-200 text-gray-500 hover:border-gray-500 hover:text-gray-900";
  const pillActive = "bg-black text-white border-black";

  return (
    <main className="p-4 md:p-10 bg-gray-100 min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mt-8 mb-8">
          <h1
            className="text-5xl leading-none tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "-2px" }}
          >
            Node
          </h1>
          <p className="text-sm text-gray-400 mb-1">
            {hasActiveFilters ? "Filtrando resultados" : "Todos los productos"}
          </p>
        </div>

        {/* ── FILTERS ── */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 flex flex-col gap-4">

          {/* Género */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">
              Género
            </span>
            <div className="flex gap-2">
              {["Hombre", "Mujer"].map((gender) => (
                <button
                  key={gender}
                  onClick={() =>
                    setSelectedGender(selectedGender === gender ? "" : gender)
                  }
                  className={`${pillBase} ${
                    selectedGender === gender ? pillActive : pillInactive
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Talla */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">
              Talla
            </span>
            <div className="flex flex-wrap gap-2">
              {["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`${pillBase} ${
                    selectedSize === size ? pillActive : pillInactive
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Color */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">
              Color
            </span>
            <div className="flex flex-wrap gap-2">
              {["Black","White","Beige","Blue","Red","Green","Grey"].map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setSelectedColor(selectedColor === color ? "" : color)
                  }
                  className={`${pillBase} flex items-center gap-2 ${
                    selectedColor === color ? pillActive : pillInactive
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      background: COLOR_DOTS[color],
                      border:
                        color === "White"
                          ? "1px solid #d1d5db"
                          : "none",
                      outline:
                        selectedColor === color
                          ? "1.5px solid rgba(255,255,255,0.5)"
                          : "none",
                      outlineOffset: "1px",
                    }}
                  />
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters summary */}
          {hasActiveFilters && (
            <>
              <div className="border-t border-gray-100" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {activeLabels.join("  ·  ")}
                </p>
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-400 hover:text-black underline underline-offset-2 transition-colors"
                >
                  Limpiar todo
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── PRODUCT GRID ── */}
        <InfiniteScroll
          dataLength={products.length}
          next={loadProducts}
          hasMore={hasMore}
          loader={
            <p className="text-center py-10 text-lg">Cargando...</p>
          }
          endMessage={
            <p className="text-center py-10 text-gray-500">
              No hay más productos
            </p>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products
              .filter((product: any) => {
                const matchesSize =
                  !selectedSize ||
                  product.variants?.some(
                    (v: any) => v.available && v.size === selectedSize
                  );
                const matchesGender =
                  !selectedGender || product.gender === selectedGender;
                const colorTag = product.tags?.find((tag: string) =>
                  tag.includes("Color::")
                );
                const productColors = colorTag
                  ?.split("Color::")[1]
                  ?.split("/")
                  ?.map((c: string) => c.trim());
                const matchesColor =
                  !selectedColor || productColors?.includes(selectedColor);
                return matchesSize && matchesGender && matchesColor;
              })
              .map((product: any) => {
                const firstNames = ["Palermo","Slipstream","Suede","Clyde","Teveris","Spirex","Morphic","Trinity","Caven","Pacer","Electron","Mirage","Velophasis","Rider","Hypnotic","Future","Plexus","R698","TRC","RS-X","Court","Blaze","Indoor","GV","CA"];
                const secondNames = ["NITRO","Speed","Fusion","Retro","Sport","Classic","Premium","Street","Tech","Racer","Athletic","Garage","Performance","Track","Runner","Motion","Heritage","Vintage","Lux","Drift","Tokyo","NYC","Summer","Garage","Cat","Style","Wave","Club","Base","Remix"];
                const thirdNames = ["Palermo","Nitro","Trinity","Suede","Clyde","Speedfusion","Mirage","Slipstream","Pacer","Morphic","Velophasis","Hypnotic","Future","Blaze","Rider","Court","R698","Indoor","CA","GV","Electron","Spirex","Playmaker","Thunder","Nova","Caven"];
                const fakeName =
                  firstNames[product.id % firstNames.length] +
                  " " +
                  secondNames[Math.floor(product.id / 3) % secondNames.length] +
                  " " +
                  thirdNames[Math.floor(product.id / 7) % thirdNames.length];

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
                      ${" "}
                      {(
                        Math.ceil(product.price_cop / 1000) * 1000
                      ).toLocaleString("es-CO")}{" "}
                      COP
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
                              `Hola, quiero este producto: ${fakeName}, REF: ${product.id}, Talla: ${size}, Precio: $${(Math.ceil(product.price_cop / 1000) * 1000).toLocaleString("es-CO")} COP`
                            )}`}
                            target="_blank"
                            className="border px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-black hover:text-white transition cursor-pointer"
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
