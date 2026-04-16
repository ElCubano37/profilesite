export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Blob 1 — indigo, top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-aurora"
        style={{
          background:
            'radial-gradient(circle at center, #6366f1 0%, #4f46e5 40%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />
      {/* Blob 2 — violet, top-right */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl animate-aurora"
        style={{
          background:
            'radial-gradient(circle at center, #7c3aed 0%, #6d28d9 40%, transparent 70%)',
          backgroundSize: '200% 200%',
          animationDelay: '-3s',
        }}
      />
      {/* Blob 3 — blue, bottom-center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl animate-aurora"
        style={{
          background:
            'radial-gradient(ellipse at center, #3b82f6 0%, #1d4ed8 40%, transparent 70%)',
          backgroundSize: '200% 200%',
          animationDelay: '-6s',
        }}
      />
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
    </div>
  )
}
