"use client";

import { ToggleBtn } from "@/app/components/ui/buttons";
import LoadingForm from "@/app/components/ui/loadingviews";
import { useFormEditorStore } from "@/stores/form-editor-store";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { useShallow } from "zustand/react/shallow";

export default function SettingsPage() {
  const { settings, updateSettings } = useFormEditorStore(
    useShallow((s) => ({
      settings: s.form.settings,
      updateSettings: s.updateSettings,
    })),
  );

  const [openDropdowns, setopenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (section: string) =>
    setopenDropdowns((prev) =>
      prev.includes(section)
        ? prev.filter((d) => d !== section)
        : [...prev, section],
    );

  return settings ? (
    <div className="md:px-8 pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-foreground border border-border p-8 space-y-6 rounded-3xl">
          <div className="text-lg">Pengaturan</div>
          <div className="flex gap-4 justify-between items-center">
            <div>
              <div>Jadikan kuis</div>
              <div className="text-xs text-muted-darker">
                Jadikan formulir ini sebagai kuis, setiap pertanyaan dapat
                diberi poin.
              </div>
            </div>
            <div>
              <ToggleBtn
                onClick={() => updateSettings({ isQuiz: !settings.isQuiz })}
                active={Boolean(settings.isQuiz)}
              />
            </div>
          </div>
          <button
            className="text-left w-full flex justify-between items-center"
            onClick={() => toggleDropdown("respondent-access")}
          >
            <div className="">
              <div>Akses responden</div>
              <div className="text-xs text-muted-darker">
                Atur akses responden.
              </div>
            </div>
            <div>
              <LuChevronRight
                className={`${openDropdowns.includes("respondent-access") && "rotate-90"} transition-all`}
              />
            </div>
          </button>
          <div
            hidden={!openDropdowns.includes("respondent-access")}
            className="pl-4 space-y-6"
          >
            <div className="flex gap-4 justify-between items-center">
              <div className="">
                <div>Melihat hasil</div>
                <div className="text-xs text-muted-darker">
                  Melihat hasil setelah submit.
                </div>
              </div>
              <div>
                <ToggleBtn
                  onClick={() =>
                    updateSettings({
                      allowSeeResult: !settings.allowSeeResult,
                      allowSeeWrongAnswers: !settings.allowSeeResult
                        ? settings.allowSeeWrongAnswers
                        : false,
                    })
                  }
                  active={Boolean(settings.allowSeeResult)}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="">
                <div>Melihat poin pertanyaan</div>
                <div className="text-xs text-muted-darker">
                  Melihat jumlah poin pada setiap pertanyaan saat sedang mengisi
                  form.
                </div>
              </div>
              <div>
                <ToggleBtn
                  onClick={() =>
                    updateSettings({
                      allowSeeScore: !settings.allowSeeScore,
                    })
                  }
                  active={Boolean(settings.allowSeeScore)}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="">
                <div>Melihat jawaban benar</div>
                <div className="text-xs text-muted-darker">
                  Melihat jawaban yang benar di ringkasan hasil.
                </div>
              </div>
              <div>
                <ToggleBtn
                  onClick={() =>
                    updateSettings({
                      allowSeeCorrectAnswers: !settings.allowSeeCorrectAnswers,
                    })
                  }
                  active={Boolean(settings.allowSeeCorrectAnswers)}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="">
                <div>Melihat jawaban salah</div>
                <div className="text-xs text-muted-darker">
                  Melihat jawaban yang salah di ringkasan hasil.
                </div>
              </div>
              <div>
                <ToggleBtn
                  onClick={() =>
                    updateSettings({
                      allowSeeWrongAnswers: !settings.allowSeeWrongAnswers,
                    })
                  }
                  active={Boolean(settings.allowSeeWrongAnswers)}
                />
              </div>
            </div>
          </div>

          <button
            className="text-left w-full flex justify-between items-center"
            onClick={() => toggleDropdown("presentation")}
          >
            <div className="">
              <div>Presentasi</div>
              <div className="text-xs text-muted-darker">
                Atur bagaimana formulir ditampilkan.
              </div>
            </div>
            <div>
              <LuChevronRight
                className={`${openDropdowns.includes("presentation") && "rotate-90"} transition-all`}
              />
            </div>
          </button>
          <div
            hidden={!openDropdowns.includes("presentation")}
            className="pl-4 space-y-6"
          >
            <div className="flex gap-4 justify-between items-center">
              <div className="">
                <div>Acak pertanyaan</div>
                <div className="text-xs text-muted-darker">
                  Acak pertanyaan saat ditampilkan kepada responden.
                </div>
              </div>
              <div>
                <ToggleBtn
                  onClick={() =>
                    updateSettings({
                      shuffleQuestions: !settings.shuffleQuestions,
                    })
                  }
                  active={Boolean(settings.shuffleQuestions)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-foreground border border-border p-8 space-y-6 rounded-3xl">
          <div className="text-lg">Defaults</div>
          <div className="flex gap-4 justify-between items-center">
            <div>
              <div>Pertanyaan harus diisi</div>
              <div className="text-xs text-muted-darker">
                Wajibkan setiap pertanyaan baru
              </div>
            </div>
            <div>
              <ToggleBtn
                onClick={() =>
                  updateSettings({
                    questionRequiredDefault: !settings.questionRequiredDefault,
                  })
                }
                active={Boolean(settings.questionRequiredDefault)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingForm text="Memuat pengaturan" />
  );
}
