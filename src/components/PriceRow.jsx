function PriceRow({ label, value }) {
  <div className="flex justify-between items-center text-sm">
    <span className="font-bold text-slate-400">{label}</span>
    <span className="font-black text-slate-900">{value}</span>
  </div>;
}

export default PriceRow;
