function KPI({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl">
      <p className="text-slate-500 text-xs">{title}</p>
      <h3 className="text-xl font-black">{value}</h3>
    </div>
  );
}
export default KPI;
