
const stats = [
  { value: "500+", label: "Membres" },
  { value: "30+", label: "Ateliers" },
  { value: "1000+", label: "Participants" },
  { value: "20+", label: "Partenaires" }
];

const Impact = () => {
  return (
    <section className="py-20 bg-slate-100 text-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-navy-deep font-medium uppercase tracking-widest text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;