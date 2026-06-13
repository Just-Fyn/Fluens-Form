"use client";

import { useFormEditorStore } from "@/stores/form-editor-store";
import { Question } from "@/types/form";
import { useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { useShallow } from "zustand/react/shallow";
import {PrimaryTextarea} from "@/app/components/ui/textareas";

export default function QuestionText(q: Question) {
  const [openSettings, setOpenSettings] = useState(false);
  const { updateQuestion } = useFormEditorStore(
    useShallow((s) => ({
      updateQuestion: s.updateQuestion,
    })),
  );

  const [enablecorrectAnswers, setEnablecorrectAnswers] = useState(
    Boolean(q.correctAnswers?.length),
  );

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        {openSettings && (
          <div
            className="fixed inset-0 z-90"
            onClick={() => setOpenSettings(false)}
          ></div>
        )}
        <button
          type="button"
          className={`mt-2 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${openSettings ? "bg-brand-light/10 text-brand" : "text-muted-darker hover:bg-muted"}`}
          onClick={() => setOpenSettings(true)}
        >
          <LuEllipsisVertical size={18} />
        </button>

        {openSettings && (
          <div className="absolute top-full right-0 mt-2 min-w-50 w-max bg-foreground z-100 border border-muted shadow-lg rounded-3xl p-2">
            {enablecorrectAnswers ? (
              <button
                className="w-full px-4 h-11 text-left rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => {
                  setEnablecorrectAnswers(false);
                  setOpenSettings(false);
                  updateQuestion(q.id, { correctAnswers: [] });
                }}
              >
                Hapus kunci jawaban
              </button>
            ) : (
              <button
                className="w-full px-4 h-11 text-left rounded-full text-sm font-medium hover:bg-brand-light/10 transition-colors"
                onClick={() => {
                  setEnablecorrectAnswers(true);
                  setOpenSettings(false);
                }}
              >
                Tambahkan kunci jawaban
              </button>
            )}
          </div>
        )}
      </div>

      <PrimaryTextarea
        placeholder="Teks jawaban akan muncul di sini..."
        disabled
      />

      {enablecorrectAnswers && (
        <div className="mt-3 p-4 bg-green-50/50 border border-green-100 rounded-[20px]">
          <div className="text-sm font-semibold text-green-600 mb-2">
            Kunci Jawaban Tepat (Pisahkan dengan titik koma):
          </div>
          <PrimaryTextarea
            defaultValue={q.correctAnswers?.toString().replaceAll(",", "; ")}
            placeholder="contoh: jakarta; dki jakarta; kota jakarta"
            className="w-full p-3 bg-foreground border border-green-200 focus:border-green-400 focus:shadow-[0_0_0_4px_#00ff0010] rounded-xl outline-none text-sm resize-none transition-all"
            onBlur={(e) => {
              updateQuestion(q.id, {
                correctAnswers: e.target.value.split(";").map((v) => v.trim()),
              });
              e.target.value = q.correctAnswers?.toString().replaceAll(",", "; ")
            }}
          />
        </div>
      )}
    </div>
  );
}
