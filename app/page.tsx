// "use client";

// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

// const COLOR_DOTS: Record<string, string> = {
//   Black: "#1a1a1a",
//   White: "#f0ede8",
//   Beige: "#d4b896",
//   Blue: "#378add",
//   Red: "#e24b4a",
//   Green: "#639922",
//   Grey: "#888780",
// };

// const firstNames = ["Palermo","Slipstream","Suede","Clyde","Teveris","Spirex","Morphic","Trinity","Caven","Pacer","Electron","Mirage","Velophasis","Rider","Hypnotic","Future","Plexus","R698","TRC","RS-X","Court","Blaze","Indoor","GV","CA"];
// const secondNames = ["NITRO","Speed","Fusion","Retro","Sport","Classic","Premium","Street","Tech","Racer","Athletic","Garage","Performance","Track","Runner","Motion","Heritage","Vintage","Lux","Drift","Tokyo","NYC","Summer","Garage","Cat","Style","Wave","Club","Base","Remix"];
// const thirdNames = ["Palermo","Nitro","Trinity","Suede","Clyde","Speedfusion","Mirage","Slipstream","Pacer","Morphic","Velophasis","Hypnotic","Future","Blaze","Rider","Court","R698","Indoor","CA","GV","Electron","Spirex","Playmaker","Thunder","Nova","Caven"];
// const getFakeName = (id: number) =>
//   firstNames[id % firstNames.length] + " " +
//   secondNames[Math.floor(id / 3) % secondNames.length] + " " +
//   thirdNames[Math.floor(id / 7) % thirdNames.length];

// const menSizes = [
//   ["37","24","6"],["37½","24.5","6½"],["38","25","7"],["38½","25.5","7½"],
//   ["39","26","8"],["39½","26.5","8½"],["40","27","9"],["40½","27.5","9½"],
//   ["41","28","10"],["41½","28.5","10½"],["42","29","11"],["42½","29.5","11½"],
//   ["43","30","12"],["43½","30.5","12½"],["44","31","13"],["44½","31.5","13½"],["45","32","14"]
// ];
// const womenSizes = [
//   ["35","22","5½"],["36","22.5","6"],["36½","23","6½"],["37","23.5","7"],
//   ["37½","24","7½"],["38","24.5","8"],["38½","25","8½"],["39","25.5","9"]
// ];

// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [productImages, setProductImages] = useState<{ [key: number]: number }>({});
//   const [showSizeGuide, setShowSizeGuide] = useState(false);
//   const [sizeGuideGender, setSizeGuideGender] = useState("");

//   useEffect(() => {
//     setProducts([]);
//     setPage(1);
//     setHasMore(true);
//   }, [selectedGender, selectedSize, selectedColor]);

//   useEffect(() => {
//     loadProducts();
//   }, [page, selectedGender, selectedSize, selectedColor]);

//   async function loadProducts() {
//     try {
//       const res = await fetch(
//         `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}&color=${selectedColor}`,
//         { cache: "no-store" }
//       );
//       const data = await res.json();
//       if (!data.length) { setHasMore(false); return; }
//       setProducts(prev => {
//         const all = [...prev, ...data];
//         const unique = all.filter((p, i, s) => i === s.findIndex(x => x.id === p.id));
//         unique.sort((a, b) => a.price_cop - b.price_cop);
//         return unique;
//       });
//       setPage(prev => prev + 1);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const hasActiveFilters = selectedGender || selectedSize || selectedColor;
//   const activeLabels = [selectedGender, selectedSize ? `Talla ${selectedSize}` : "", selectedColor].filter(Boolean);

//   function clearAll() {
//     setSelectedGender("");
//     setSelectedSize("");
//     setSelectedColor("");
//   }

//   const pillBase = "px-4 py-1.5 rounded-full border text-sm transition-all duration-150 cursor-pointer whitespace-nowrap";
//   const pillInactive = "bg-white border-gray-200 text-gray-500 hover:border-gray-500 hover:text-gray-900";
//   const pillActive = "bg-black text-white border-black";

//   return (
//     <main className="p-4 md:p-10 bg-gray-100 min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@700&display=swap');
//         .size-tile { display: flex; align-items: center; gap: 4px; }
//         .size-tile .arrow { opacity: 0; font-size: 10px; transition: opacity 0.12s; }
//         .size-tile:hover .arrow { opacity: 1; }
//       `}</style>

//       <div className="max-w-7xl mx-auto">

//         {/* ── HEADER ── */}
//         <div className="flex items-end justify-between mt-8 mb-8">
//           <h1 className="text-5xl leading-none" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "-2px" }}>
//             Node
//           </h1>
//           <p className="text-sm text-gray-400 mb-1">
//             {hasActiveFilters ? "Filtrando resultados" : "Todos los productos"}
//           </p>
//         </div>

//         {/* ── FILTER PANEL ── */}
//         <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 flex flex-col gap-4">
//           <div className="flex items-center gap-4">
//             <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">Género</span>
//             <div className="flex gap-2">
//               {["Hombre", "Mujer"].map(gender => (
//                 <button key={gender} onClick={() => setSelectedGender(selectedGender === gender ? "" : gender)}
//                   className={`${pillBase} ${selectedGender === gender ? pillActive : pillInactive}`}>
//                   {gender}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="border-t border-gray-100" />
//           <div className="flex items-center gap-4">
//             <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">Talla</span>
//             <div className="flex flex-wrap gap-2">
//               {["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12"].map(size => (
//                 <button key={size} onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
//                   className={`${pillBase} ${selectedSize === size ? pillActive : pillInactive}`}>
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="border-t border-gray-100" />
//           <div className="flex items-center gap-4">
//             <span className="text-xs font-medium tracking-widest uppercase text-gray-400 w-14 shrink-0">Color</span>
//             <div className="flex flex-wrap gap-2">
//               {["Black","White","Beige","Blue","Red","Green","Grey"].map(color => (
//                 <button key={color} onClick={() => setSelectedColor(selectedColor === color ? "" : color)}
//                   className={`${pillBase} flex items-center gap-2 ${selectedColor === color ? pillActive : pillInactive}`}>
//                   <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{
//                     background: COLOR_DOTS[color],
//                     border: color === "White" ? "1px solid #d1d5db" : "none",
//                     outline: selectedColor === color ? "1.5px solid rgba(255,255,255,0.5)" : "none",
//                     outlineOffset: "1px",
//                   }} />
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>
//           {hasActiveFilters && (
//             <>
//               <div className="border-t border-gray-100" />
//               <div className="flex items-center justify-between">
//                 <p className="text-xs text-gray-700">{activeLabels.join("  ·  ")}</p>
//                 <button onClick={clearAll} className="text-xs text-gray-400 hover:text-black underline underline-offset-2 transition-colors">
//                   Limpiar todo
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── PRODUCT GRID ── */}
//         <InfiniteScroll
//           dataLength={products.length}
//           next={loadProducts}
//           hasMore={hasMore}
//           loader={<p className="text-center py-10 text-lg">Cargando...</p>}
//           endMessage={<p className="text-center py-10 text-gray-500">No hay más productos</p>}
//         >
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {products
//               .filter((product: any) => {
//                 const matchesSize = !selectedSize || product.variants?.some((v: any) => v.available && v.size === selectedSize);
//                 const matchesGender = !selectedGender || product.gender === selectedGender;
//                 const colorTag = product.tags?.find((tag: string) => tag.includes("Color::"));
//                 const productColors = colorTag?.split("Color::")[1]?.split("/")?.map((c: string) => c.trim());
//                 const matchesColor = !selectedColor || productColors?.includes(selectedColor);
//                 return matchesSize && matchesGender && matchesColor;
//               })
//               .map((product: any) => {
//                 const fakeName = getFakeName(product.id);
//                 const availableSizes = product.variants
//                 ?.filter((v: any) => v.available)
//                 ?.map((v: any) => v.size)
//                 ?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
//                 const currentImageIndex = productImages[product.id] || 0;
//                 const totalImages = product.images?.length || 1;
//                 const price = (Math.ceil(product.price_cop / 1000) * 1000).toLocaleString("es-CO");

//                 return (
//                   <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">

//                     {/* ── IMAGEN ── */}
//                     <div className="relative">
//                       <img
//                         src={product.images?.[currentImageIndex]?.url || product.image}
//                         alt={fakeName}
//                         className="w-full aspect-square object-cover cursor-pointer"
//                         onClick={() => { setSelectedProduct(product); setSelectedImage(currentImageIndex); }}
//                       />
//                       {totalImages > 1 && (
//                         <span className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
//                           {currentImageIndex + 1}/{totalImages}
//                         </span>
//                       )}
//                       <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2">
//                         <button
//                           onClick={() => setProductImages(prev => ({ ...prev, [product.id]: Math.max((prev[product.id] || 0) - 1, 0) }))}
//                           className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-gray-200 text-sm hover:bg-white transition"
//                         >←</button>
//                         <button
//                           onClick={() => setProductImages(prev => ({ ...prev, [product.id]: Math.min((prev[product.id] || 0) + 1, totalImages - 1) }))}
//                           className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-gray-200 text-sm hover:bg-white transition"
//                         >→</button>
//                       </div>
//                     </div>

//                     {/* ── CUERPO ── */}
//                     <div className="p-3 md:p-4 flex flex-col flex-1">

//                       {/* Vendor + nombre */}
//                       <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.vendor}</p>
//                       <h2 className="font-bold text-sm md:text-base leading-tight mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//                         {fakeName}
//                       </h2>

//                       {/* Badge género */}
//                       <span className="inline-block self-start bg-gray-100 text-gray-500 text-xs px-3 py-0.5 rounded-full mb-3">
//                         {product.gender}
//                       </span>

//                       {/* Precio */}
//                       <p className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
//                         $ {price} <span className="text-sm font-normal text-gray-400">COP</span>
//                       </p>

//                       {/* ── TALLAS CTA ── */}
//                       <div className="mt-auto">
//                         <div className="flex items-center gap-1.5 mb-2">
//                           {/* Ícono WhatsApp SVG inline */}
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
//                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25d366"/>
//                             <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.418A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.117l-.292-.174-3.033.865.866-3.012-.192-.311A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="#25d366"/>
//                           </svg>
//                           <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Pide tu talla por WhatsApp
//                           </p>
//                         </div>

//                         <div className="flex flex-wrap gap-1.5 mb-3">
//                           {availableSizes?.map((size: string) => (
//                             <a
//                               key={size}
//                                     href={`https://wa.me/573207995500?text=${encodeURIComponent(
//                                     `Hola! Vi este producto en su tienda y me interesa pedirlo:

//                                     *${fakeName}*
//                                     Marca: ${product.vendor}
//                                     Talla: ${size}
//                                     Precio: $${price} COP
//                                     Ver foto: ${product.images?.[currentImageIndex]?.url || product.image}
//                                     REF: ${product.id}

//                                     ¿Está disponible?`
//                                     )}`}
//                               target="_blank"
//                               className="size-tile border border-gray-200 px-2.5 py-1 rounded-lg text-xs md:text-sm font-medium hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-all duration-150 cursor-pointer"
//                             >
//                               {size}
//                               <span className="arrow">↗</span>
//                             </a>
//                           ))}
//                         </div>

//                         <button
//                           onClick={() => { setSizeGuideGender(product.gender); setShowSizeGuide(true); }}
//                           className="w-full border border-gray-200 rounded-xl py-2 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition flex items-center justify-center gap-1.5"
//                         >
//                           📏 Guía de tallas
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </InfiniteScroll>
//       </div>

//       {/* ── MODAL IMAGEN ── */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
//           <div className="bg-white rounded-2xl max-w-4xl w-full p-4" onClick={e => e.stopPropagation()}>
//             <img
//               src={selectedProduct.images?.[selectedImage]?.url || selectedProduct.image}
//               className="w-full max-h-[70vh] object-contain rounded-xl"
//             />
//             <div className="flex gap-2 mt-4 overflow-x-auto">
//               {(selectedProduct.images?.length ? selectedProduct.images : [{ url: selectedProduct.image }])
//                 .map((img: any, index: number) => (
//                   <img key={index} src={img.url} onClick={() => setSelectedImage(index)}
//                     className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === index ? "border-black" : "border-transparent"}`} />
//                 ))}
//             </div>
//             <button onClick={() => setSelectedProduct(null)} className="mt-4 px-4 py-2 bg-black text-white rounded-xl">
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── MODAL GUÍA DE TALLAS ── */}
//       {showSizeGuide && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
//           <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
//             <h2 className="text-2xl font-bold mb-4">Guía de Tallas {sizeGuideGender}</h2>
//             <div className="flex flex-col md:flex-row gap-6 items-start">
//               <div className="md:w-1/2">
//                 <img src="/guia-tallas-hombre.webp" alt="Guía de tallas" className="w-full object-contain rounded-xl" />
//               </div>
//               <div className="md:w-1/2 overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border p-2">Talla CO</th>
//                       <th className="border p-2">Largo Pie (cm)</th>
//                       <th className="border p-2">Talla US</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(sizeGuideGender === "Mujer" ? womenSizes : menSizes).map(row => (
//                       <tr key={row[0]}>
//                         <td className="border p-2 text-center">{row[0]}</td>
//                         <td className="border p-2 text-center">{row[1]}</td>
//                         <td className="border p-2 text-center">{row[2]}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
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

const firstNames = ["Palermo","Slipstream","Suede","Clyde","Teveris","Spirex","Morphic","Trinity","Caven","Pacer","Electron","Mirage","Velophasis","Rider","Hypnotic","Future","Plexus","R698","TRC","RS-X","Court","Blaze","Indoor","GV","CA"];
const secondNames = ["NITRO","Speed","Fusion","Retro","Sport","Classic","Premium","Street","Tech","Racer","Athletic","Garage","Performance","Track","Runner","Motion","Heritage","Vintage","Lux","Drift","Tokyo","NYC","Summer","Garage","Cat","Style","Wave","Club","Base","Remix"];
const thirdNames = ["Palermo","Nitro","Trinity","Suede","Clyde","Speedfusion","Mirage","Slipstream","Pacer","Morphic","Velophasis","Hypnotic","Future","Blaze","Rider","Court","R698","Indoor","CA","GV","Electron","Spirex","Playmaker","Thunder","Nova","Caven"];
const getFakeName = (id: number) =>
  firstNames[id % firstNames.length] + " " +
  secondNames[Math.floor(id / 3) % secondNames.length] + " " +
  thirdNames[Math.floor(id / 7) % thirdNames.length];

const menSizes = [
  ["37","24","6"],["37½","24.5","6½"],["38","25","7"],["38½","25.5","7½"],
  ["39","26","8"],["39½","26.5","8½"],["40","27","9"],["40½","27.5","9½"],
  ["41","28","10"],["41½","28.5","10½"],["42","29","11"],["42½","29.5","11½"],
  ["43","30","12"],["43½","30.5","12½"],["44","31","13"],["44½","31.5","13½"],["45","32","14"]
];
const womenSizes = [
  ["35","22","5½"],["36","22.5","6"],["36½","23","6½"],["37","23.5","7"],
  ["37½","24","7½"],["38","24.5","8"],["38½","25","8½"],["39","25.5","9"]
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState<{ [key: number]: number }>({});
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeGuideGender, setSizeGuideGender] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGender, selectedSize, selectedColor, selectedBrand]);

//   useEffect(() => {
//     loadProducts();
//   }, [page, selectedGender, selectedSize, selectedColor, selectedBrand]);

useEffect(() => {
  if (page === 1) return; // el reset ya lo maneja el otro efecto
  loadProducts();
}, [page]);

  async function loadProducts() {
    try {
      const res = await fetch(
        `https://node-api-fmq5.onrender.com/products?page=${page}&gender=${selectedGender}&size=${selectedSize}&color=${selectedColor}&brand=${selectedBrand.toUpperCase()}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (!data.length) { setHasMore(false); return; }
      setProducts(prev => {
        const all = [...prev, ...data];
        const unique = all.filter((p, i, s) => i === s.findIndex(x => x.id === p.id));
        unique.sort((a, b) => a.price_cop - b.price_cop);
        return unique;
      });
      setPage(prev => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const hasActiveFilters = selectedGender || selectedSize || selectedColor|| selectedBrand;
  const activeLabels = [selectedGender, selectedSize ? `Talla ${selectedSize}` : "", selectedColor, selectedBrand].filter(Boolean);

  function clearAll() {
    setSelectedGender("");
    setSelectedSize("");
    setSelectedColor("");
    setSelectedBrand("");
  }

  const pillBase = "px-4 py-1.5 rounded-full border text-sm transition-all duration-150 cursor-pointer whitespace-nowrap";
  const pillInactive = "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-zinc-300 hover:border-gray-500 dark:hover:border-zinc-400 hover:text-gray-900 dark:hover:text-white";
  const pillActive = "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white";

  return (
    <main className="p-4 md:p-10 bg-gray-100 dark:bg-zinc-900 min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@700&display=swap');
        .size-tile { display: flex; align-items: center; gap: 4px; }
        .size-tile .arrow { opacity: 0; font-size: 10px; transition: opacity 0.12s; }
        .size-tile:hover .arrow { opacity: 1; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
{/* ── HEADER ── */}
<div className="mt-8 mb-8 pb-6 border-b border-gray-100 dark:border-zinc-800">
  <div className="flex items-end justify-between gap-4">
    <div>
      <div className="flex items-baseline gap-2.5 mb-1.5">
        <h1
          className="text-5xl leading-none text-gray-900 dark:text-white"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "-3px" }}
        >
          NODE
        </h1>
      </div>
      <p className="text-[13.5px] text-gray-500 dark:text-zinc-400 leading-snug">
        Compras por encargo de productos originales en outlets de Estados Unidos
      </p>
    </div>
    <p className="text-xs text-gray-400 dark:text-zinc-500 mb-1 whitespace-nowrap">
      {hasActiveFilters ? "Filtrando resultados" : "Todos los productos"}
    </p>
  </div>
</div>
        {/* ── FILTER PANEL ── */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col gap-4">

          {/* Género */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-zinc-500 w-14 shrink-0">
              Género
            </span>
            <div className="flex gap-2">
              {["Hombre", "Mujer"].map(gender => (
                <button key={gender} onClick={() => setSelectedGender(selectedGender === gender ? "" : gender)}
                  className={`${pillBase} ${selectedGender === gender ? pillActive : pillInactive}`}>
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-zinc-700" />

          {/* Talla */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-zinc-500 w-14 shrink-0">
              Talla US
            </span>
            <div className="flex flex-wrap gap-2">
              {["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12"].map(size => (
                <button key={size} onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                  className={`${pillBase} ${selectedSize === size ? pillActive : pillInactive}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-zinc-700" />

          {/* Color */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-zinc-500 w-14 shrink-0">
              Color
            </span>
            <div className="flex flex-wrap gap-2">
              {["Black","White","Beige","Blue","Red","Green","Grey"].map(color => (
                <button key={color} onClick={() => setSelectedColor(selectedColor === color ? "" : color)}
                  className={`${pillBase} flex items-center gap-2 ${selectedColor === color ? pillActive : pillInactive}`}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{
                    background: COLOR_DOTS[color],
                    border: color === "White" ? "1px solid #d1d5db" : "none",
                    outline: selectedColor === color ? "1.5px solid rgba(255,255,255,0.5)" : "none",
                    outlineOffset: "1px",
                  }} />
                  {color}
                </button>
              ))}
            </div>
          </div>






<div className="border-t border-gray-100 dark:border-zinc-700" />

<div className="flex items-center gap-4">
  <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-zinc-500 w-14 shrink-0">
    Marca
  </span>
  <div className="flex flex-wrap gap-2">
    {["Puma", "Adidas"].map(brand => (
      <button key={brand} onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
        className={`${pillBase} ${selectedBrand === brand ? pillActive : pillInactive}`}>
        {brand}
      </button>
    ))}
  </div>
</div>





          {/* Filtros activos */}
          {hasActiveFilters && (
            <>
              <div className="border-t border-gray-100 dark:border-zinc-700" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-700 dark:text-zinc-300">{activeLabels.join("  ·  ")}</p>
                <button onClick={clearAll} className="text-xs text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors">
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
          loader={<p className="text-center py-10 text-lg text-gray-500 dark:text-zinc-400">Cargando...</p>}
          endMessage={<p className="text-center py-10 text-gray-400 dark:text-zinc-500">No hay más productos</p>}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products
              .filter((product: any) => {
                const matchesSize = !selectedSize || product.variants?.some((v: any) => v.available && v.size === selectedSize);
                const matchesGender = !selectedGender || product.gender === selectedGender;
                const colorTag = product.tags?.find((tag: string) => tag.includes("Color::"));
                const productColors = colorTag?.split("Color::")[1]?.split("/")?.map((c: string) => c.trim());
                const matchesColor = !selectedColor || productColors?.includes(selectedColor);
                const matchesBrand = !selectedBrand || product.vendor?.toLowerCase() === selectedBrand.toLowerCase();
                return matchesSize && matchesGender && matchesColor && matchesBrand;
              })
              .map((product: any) => {
                const fakeName = getFakeName(product.id);
                const availableSizes = product.variants
                  ?.filter((v: any) => v.available)
                  ?.map((v: any) => v.size)
                  ?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
                const currentImageIndex = productImages[product.id] || 0;
                const totalImages = product.images?.length || 1;
                const price = (Math.ceil(product.price_cop / 1000) * 1000).toLocaleString("es-CO");

                return (
                  <div key={product.id} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-700 shadow-sm flex flex-col">

                    {/* ── IMAGEN ── */}
                    <div className="relative">
                      <img
                        src={product.images?.[currentImageIndex]?.url || product.image}
                        alt={fakeName}
                        className="w-full aspect-square object-cover cursor-pointer"
                        onClick={() => { setSelectedProduct(product); setSelectedImage(currentImageIndex); }}
                      />
                      {totalImages > 1 && (
                        <span className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
                          {currentImageIndex + 1}/{totalImages}
                        </span>
                      )}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2">
                        <button
                          onClick={() => setProductImages(prev => ({ ...prev, [product.id]: Math.max((prev[product.id] || 0) - 1, 0) }))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-600 text-sm text-gray-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition"
                        >←</button>
                        <button
                          onClick={() => setProductImages(prev => ({ ...prev, [product.id]: Math.min((prev[product.id] || 0) + 1, totalImages - 1) }))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-600 text-sm text-gray-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition"
                        >→</button>
                      </div>
                    </div>

                    {/* ── CUERPO ── */}
                    <div className="p-3 md:p-4 flex flex-col flex-1">

                      {/* Vendor + nombre */}
                      <p className="text-xs text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                        {product.vendor}
                      </p>
                      <h2
                        className="font-bold text-sm md:text-base leading-tight mb-2 text-gray-900 dark:text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {fakeName}
                      </h2>

                      {/* Badge género */}
                      <span className="inline-block self-start bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 text-xs px-3 py-0.5 rounded-full mb-3">
                        {product.gender}
                      </span>

                      {/* Precio */}
                      <p
                        className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        $ {price}{" "}
                        <span className="text-sm font-normal text-gray-400 dark:text-zinc-500">COP</span>
                      </p>

                      {/* ── TALLAS CTA ── */}
                      <div className="mt-auto">
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25d366"/>
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.418A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.117l-.292-.174-3.033.865.866-3.012-.192-.311A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="#25d366"/>
                          </svg>
                          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                            Pide tu talla por WhatsApp
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {availableSizes?.map((size: string) => (
                            <a
                              key={size}
                              href={`https://wa.me/573207995500?text=${encodeURIComponent(
                                `Hola! 👋 Vi este producto en su tienda y me interesa pedirlo:\n\n👟 *${fakeName}*\n🏷️ Marca: ${product.vendor}\n📏 Talla: ${size}\n💰 Precio: $${price} COP\n🔗 Ver foto: ${product.images?.[currentImageIndex]?.url || product.image}\n🔢 REF: ${product.id}\n\n¿Está disponible?`
                              )}`}
                              target="_blank"
                              className="size-tile border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 px-2.5 py-1 rounded-lg text-xs md:text-sm font-medium hover:bg-[#25d366] hover:text-white hover:border-[#25d366] dark:hover:bg-[#25d366] dark:hover:border-[#25d366] dark:hover:text-white transition-all duration-150 cursor-pointer"
                            >
                              {size}
                              <span className="arrow">↗</span>
                            </a>
                          ))}
                        </div>

                        <button
                          onClick={() => { setSizeGuideGender(product.gender); setShowSizeGuide(true); }}
                          className="w-full border border-gray-200 dark:border-zinc-600 rounded-xl py-2 text-xs text-gray-400 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:text-gray-700 dark:hover:text-zinc-200 transition flex items-center justify-center gap-1.5"
                        >
                          📏 Guía de tallas
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>

      {/* ── MODAL IMAGEN ── */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl max-w-4xl w-full p-4" onClick={e => e.stopPropagation()}>
            <img
              src={selectedProduct.images?.[selectedImage]?.url || selectedProduct.image}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {(selectedProduct.images?.length ? selectedProduct.images : [{ url: selectedProduct.image }])
                .map((img: any, index: number) => (
                  <img key={index} src={img.url} onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 shrink-0 ${selectedImage === index ? "border-black dark:border-white" : "border-transparent"}`} />
                ))}
            </div>
            <button onClick={() => setSelectedProduct(null)} className="mt-4 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL GUÍA DE TALLAS ── */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Guía de Tallas {sizeGuideGender}
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/2">
                <img src="/guia-tallas-hombre.webp" alt="Guía de tallas" className="w-full object-contain rounded-xl" />
              </div>
              <div className="md:w-1/2 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-zinc-700">
                      <th className="border border-gray-200 dark:border-zinc-600 p-2 text-gray-700 dark:text-zinc-200">Talla CO</th>
                      <th className="border border-gray-200 dark:border-zinc-600 p-2 text-gray-700 dark:text-zinc-200">Largo Pie (cm)</th>
                      <th className="border border-gray-200 dark:border-zinc-600 p-2 text-gray-700 dark:text-zinc-200">Talla US</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sizeGuideGender === "Mujer" ? womenSizes : menSizes).map(row => (
                      <tr key={row[0]} className="even:bg-gray-50 dark:even:bg-zinc-700/50">
                        <td className="border border-gray-200 dark:border-zinc-600 p-2 text-center text-gray-700 dark:text-zinc-300">{row[0]}</td>
                        <td className="border border-gray-200 dark:border-zinc-600 p-2 text-center text-gray-700 dark:text-zinc-300">{row[1]}</td>
                        <td className="border border-gray-200 dark:border-zinc-600 p-2 text-center text-gray-700 dark:text-zinc-300">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
