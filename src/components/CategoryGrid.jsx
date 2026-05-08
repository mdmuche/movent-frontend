import { categories } from "../data/moventData";

function CategoryGrid() {
  return (
    <section className="px-4 sm:px-8 lg:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Syne']">
            Architectural Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Curated selections for every creative soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer h-64 md:h-80 ${cat.gridClass}`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-['Syne']">
                  {cat.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.subtitle}
                </p>
                <span className="text-cyan-400 text-xs font-black tracking-widest uppercase">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
