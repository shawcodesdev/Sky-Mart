import { useContext, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { MyStoreContext } from "../context/ShopContext";

const Shop = () => {
  const { products, category, setCategory } = useContext(MyStoreContext);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].sort();

  const filteredProduct = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((firstProduct, secondProduct) => {
      if (sort === "lowToHigh") return firstProduct.price - secondProduct.price;
      if (sort === "highToLow" || sort === "premiumproducts") {
        return secondProduct.price - firstProduct.price;
      }
      if (sort === "toprated")
        return secondProduct.rating - firstProduct.rating;
      return 0;
    });

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  const formatCategory = (value) =>
    value
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  const sortLabels = {
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low",
    toprated: "Top Rated",
    premiumproducts: "Premium Products",
  };

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-body'>
      {/* Header */}
      <div className='text-left'>
        <h1 className='text-3xl sm:text-4xl font-bold text-txt font-heading tracking-tight mb-1'>
          All Products
        </h1>
        <p className='text-sm sm:text-base text-gray-500 font-body'>
          {filteredProduct.length} products found
        </p>
      </div>

      {/* Filter / Search Bar Container */}
      <div className='w-full rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-5 flex flex-col gap-4'>
        {/* Controls Row: Search, Category, Sort, Clear */}
        <div className='flex flex-wrap items-center gap-3'>
          {/* Search Input Box */}
          <div className='relative flex-1 min-w-60 flex items-center bg-[#1a1a1a] border border-white/10 rounded-xl px-3.5 py-2.5'>
            <Search size={18} className='text-gray-500 mr-2 shrink-0' />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder='Search products...'
              className='bg-transparent text-sm text-txt placeholder-gray-500 outline-none w-full'
            />
            {search && (
              <button
                type='button'
                onClick={() => setSearch("")}
                aria-label='Clear search'
                title='Clear search'
                className='text-gray-500 hover:text-white transition-colors ml-1 p-0.5'>
                <X size={15} />
              </button>
            )}
          </div>
          {/* Category Dropdown */}
          <div className='relative'>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='appearance-none bg-[#1a1a1a] border border-white/10 text-txt text-sm rounded-xl px-4 py-2.5 pr-9 outline-none cursor-pointer'>
              <option value='all'>All Categories</option>
              {categories.map((value) => (
                <option key={value} value={value}>
                  {formatCategory(value)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            />
          </div>
          {/* Sort Dropdown */}
          <div className='relative'>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className='appearance-none bg-[#1a1a1a] border border-white/10 text-txt text-sm rounded-xl px-4 py-2.5 pr-9 outline-none cursor-pointer'>
              <option value='default'>Featured</option>
              <option value='lowToHigh'>Price Low → High</option>
              <option value='highToLow'>Price High → Low</option>
              <option value='toprated'>Top Rated</option>
              <option value='premiumproducts'>Premium Products</option>
            </select>
            <ChevronDown
              size={15}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            />
          </div>
          {/* Clear Button */}
          {(search || category !== "all" || sort !== "default") && (
            <button
              type='button'
              onClick={clearFilters}
              title='Clear filters'
              className='flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 font-body text-sm text-red-400 transition-all hover:bg-red-500/15 hover:text-red-300'>
              <X size={15} />
              Clear
            </button>
          )}
        </div>

        {/* Active Filter Badges */}
        {(search || category !== "all" || sort !== "default") && (
          <div className='flex flex-wrap items-center gap-2'>
            {search && (
              <span className='inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-white px-3 py-1 text-xs font-medium text-volt'>
                <span>Search: {search}</span>
                <button
                  type='button'
                  onClick={() => setSearch("")}
                  aria-label='Clear search filter'
                  className='cursor-pointer transition-colors hover:text-white'>
                  <X size={12} />
                </button>
              </span>
            )}

            {category !== "all" && (
              <span className='inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-white px-3 py-1 text-xs font-medium text-volt'>
                <span>Category: {formatCategory(category)}</span>
                <button
                  type='button'
                  onClick={() => setCategory("all")}
                  aria-label='Clear category filter'
                  className='cursor-pointer transition-colors hover:text-white'>
                  <X size={12} />
                </button>
              </span>
            )}

            {sort !== "default" && (
              <span className='inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-white px-3 py-1 text-xs font-medium text-volt'>
                <span>{sortLabels[sort]}</span>
                <button
                  type='button'
                  onClick={() => setSort("default")}
                  aria-label='Clear sort filter'
                  className='cursor-pointer transition-colors hover:text-white'>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Grid Area (You can add your product map/cards here) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredProduct.map((val) => (
          <ProductCard key={val.id} product={val} />
        ))}
      </div>
    </main>
  );
};

export default Shop;
