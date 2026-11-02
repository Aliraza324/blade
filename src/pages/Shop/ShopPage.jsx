import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sliders,
  Search,
  SlidersHorizontal,
  Star,
  Check,
  ChevronDown,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import { useConfiguratorStore } from '../../store/configuratorStore';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';
import toast from 'react-hot-toast';

export function ShopPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { applyPresetProduct } = useConfiguratorStore();
  const { addItem, openCartDrawer } = useCartStore();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedPlies, setSelectedPlies] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlies =
        selectedPlies === 'all' ||
        product.plies.toLowerCase().includes(selectedPlies.toLowerCase());

      return matchesSearch && matchesPlies;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.configuredPrice - b.configuredPrice;
      if (sortBy === 'price-high') return b.configuredPrice - a.configuredPrice;
      if (sortBy === 'weight-low') return a.weight - b.weight;
      return b.rating - a.rating; // default popular
    });
  }, [searchTerm, selectedStyle, selectedPlies, sortBy]);

  const handleCustomize = (product) => {
    applyPresetProduct(product);
    navigate('/configurator');
  };

  const handleQuickAdd = (product) => {
    addItem({
      configurationId: `${product.id}-preset`,
      name: product.name,
      subtitle: product.subtitle,
      quantity: 1,
      unitPrice: product.configuredPrice,
      customizationCost: product.configuredPrice - product.basePrice,
      estimatedWeight: product.weight,
      thumbnail: product.image
    });
    openCartDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Pro Gear Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Precision Blade Collection
            </h1>
            <p className="text-xs sm:text-sm text-white/50 mt-1">
              Browse our pre-engineered tournament series or launch any model into the 3D studio.
            </p>
          </div>

          <Link
            to="/configurator"
            className="px-5 py-3 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto shadow-lg shadow-[#FF202D]/20 transition-all hover:scale-105"
          >
            <Sliders className="w-4 h-4" />
            <span>Launch Blank 3D Studio</span>
          </Link>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-[#11141C] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search blades, woods, plies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#171B25] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF202D]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs">
            <span className="text-white/40 text-xs font-semibold shrink-0">Plies:</span>
            {['all', '3-Ply', '5-Ply', '7-Ply', 'Carbon'].map((ply) => (
              <button
                key={ply}
                onClick={() => setSelectedPlies(ply)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedPlies === ply
                    ? 'bg-[#FF202D] text-white shadow-md shadow-[#FF202D]/20'
                    : 'bg-[#171B25] text-white/60 hover:text-white'
                }`}
              >
                {ply === 'all' ? 'All Plies' : ply}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-white/40">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#171B25] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF202D]"
            >
              <option value="popular">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="weight-low">Lightest Weight</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-white/50 space-y-3">
            <p className="text-base text-white font-semibold">No blades match your search filter</p>
            <p className="text-xs">Try selecting 'All Plies' or clearing the search box.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPlies('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((blade) => (
              <div
                key={blade.id}
                className="rounded-2xl bg-[#171B25] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                {/* Image & Badges */}
                <div className="relative h-64 bg-[#11141C] p-6 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#FF202D]/20 text-[#FF202D] border border-[#FF202D]/40 text-xs font-bold">
                    {blade.badge}
                  </span>

                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-amber-400 text-xs font-bold px-2 py-1 rounded-full bg-black/40 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{blade.rating}</span>
                  </div>

                  <img
                    src={blade.image}
                    alt={blade.name}
                    onError={(e) => {
                      e.currentTarget.src = '/images/products/tt-hinoki-pro.jpg';
                    }}
                    className="h-full w-full object-cover filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/product/${blade.id}`}
                        className="text-base font-bold text-white group-hover:text-[#FF202D] transition-colors"
                      >
                        {blade.name}
                      </Link>
                      <span className="text-lg font-black text-[#FF202D]">
                        {formatCurrency(blade.configuredPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">{blade.subtitle}</p>
                    <p className="text-xs text-white/60 mt-2 line-clamp-2">{blade.description}</p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-y border-white/5 text-center text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px]">Speed</span>
                      <strong className="text-white">{blade.speed}/10</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">Control</span>
                      <strong className="text-white">{blade.control}/10</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">Weight</span>
                      <strong className="text-emerald-400">{blade.weight}g</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">Plies</span>
                      <strong className="text-white truncate block">{blade.plies.split(' ')[0]}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={() => handleCustomize(blade)}
                      className="col-span-2 py-2.5 px-3 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#FF202D]/20 active:scale-95"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Customize in 3D</span>
                    </button>

                    <button
                      onClick={() => handleQuickAdd(blade)}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 active:scale-95"
                      title="Quick Add to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

