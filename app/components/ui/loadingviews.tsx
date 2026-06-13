export default function LoadingForm({text}:{text:string}) {
  return (
    <div className="fixed inset-0 bg-background flex justify-center items-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-8 border-brand/20"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-brand animate-spin"></div>
        </div>
        <div className="text-[#64748b] font-medium tracking-wide">
          {text}
          <span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}
