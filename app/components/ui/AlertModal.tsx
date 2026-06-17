import { LuCircleAlert } from "react-icons/lu";
import { SecondaryBtn } from "./buttons";
import { useRouter } from "next/navigation";

export default function AlertModal({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-999 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md p-10 rounded-4xl bg-foreground flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-amber-50 text-amber-300 rounded-full flex items-center justify-center mb-6">
          <LuCircleAlert size={40} strokeWidth={3} />
        </div>

        <h2 className="font-bold text-2xl mb-6">{message}</h2>

        <div className="w-full space-y-2">
          <SecondaryBtn
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Muat Ulang
          </SecondaryBtn>
          <SecondaryBtn
            className="w-full hover:text-amber-300! hover:border-amber-300!"
            onClick={() => router.replace("/app")}
          >
            Ke Beranda
          </SecondaryBtn>
        </div>
      </div>
    </div>
  );
}
