"use client";

import { useFormEditorStore } from "@/stores/form-editor-store";
import { useState } from "react";
import {
  LuChevronRight,
  LuCircleCheck,
  LuEllipsisVertical,
  LuList,
  LuSquareCheck,
  LuText,
} from "react-icons/lu";
import { useShallow } from "zustand/react/shallow";

export default function QuestionSettings({ qId }: { qId: string }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openChild, setOpenChild] = useState<string | null>(null);
  
  const chToggle = (chName: string) => {
    setOpenChild((prev) => (prev === chName ? null : chName));
  };
  const closeAll = () => {
    setOpenOptions(false);
    setOpenChild(null);
  };
  const { updateQuestion, removeQuestion, changeQuestionType } = useFormEditorStore(
    useShallow((s) => ({
      updateQuestion: s.updateQuestion,
      removeQuestion: s.removeQuestion,
      changeQuestionType: s.changeQuestionType,
    })),
  );

  return (
    <div className="relative">
      {openOptions && (
        <div
          className="fixed inset-0 z-90"
          onClick={() => closeAll()}
        ></div>
      )}
      
      <button
        onClick={() => {
          openOptions ? closeAll() : setOpenOptions(true);
        }}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
          openOptions ? "bg-brand-light/10 text-brand" : "text-muted-darker hover:bg-brand-light/10 hover:text-text"
        }`}
      >
        <LuEllipsisVertical size={20} />
      </button>


      {openOptions && (
        <div className="absolute top-full right-0 mt-2 min-w-50 w-max bg-foreground z-100 border border-muted shadow-lg rounded-3xl p-2">
          <div className="flex flex-col gap-1 relative">
            <button
              className={`w-full px-4 h-11 flex items-center justify-between rounded-full text-sm font-medium transition-colors ${
                openChild === "type" ? "bg-brand-light/10 text-brand" : "text-text hover:bg-brand-light/10"
              }`}
              onClick={() => chToggle("type")}
            >
              Ubah tipe soal
              <LuChevronRight className={`transition-transform ${openChild === "type" ? "rotate-90" : ""}`} />
            </button>
            {openChild === "type" && <><button
                  className="px-4 h-11 flex items-center gap-3 rounded-full text-sm hover:bg-brand-light/10 transition-colors"
                  onClick={() => { changeQuestionType(qId, "radio"); closeAll(); }}
                >
                  <LuCircleCheck size={18} className="text-brand" /> Pilihan ganda
                </button>
                <button
                  className="px-4 h-11 flex items-center gap-3 rounded-full text-sm hover:bg-brand-light/10 transition-colors"
                  onClick={() => { changeQuestionType(qId, "text"); closeAll(); }}
                >
                  <LuText size={18} className="text-brand" /> Isian singkat
                </button>
                <button
                  className="px-4 h-11 flex items-center gap-3 rounded-full text-sm hover:bg-brand-light/10 transition-colors"
                  onClick={() => { changeQuestionType(qId, "checkbox"); closeAll(); }}
                >
                  <LuSquareCheck size={18} className="text-brand" /> Kotak centang
                </button>
                <button
                  className="px-4 h-11 flex items-center gap-3 rounded-full text-sm hover:bg-brand-light/10 transition-colors"
                  onClick={() => { changeQuestionType(qId, "select"); closeAll(); }}
                >
                  <LuList size={18} className="text-brand" /> Pilihan Dropdown
                </button></>}
            
            <button
              className="w-full px-4 h-11 flex items-center justify-between rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => removeQuestion(qId)}
            >
              Hapus Soal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}