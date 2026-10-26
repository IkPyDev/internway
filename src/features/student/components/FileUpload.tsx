import { Upload, X } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { FileLink } from "./FileLink"

interface FileUploadProps {
  fileId: string | null
  accept: string
  label: string
  busy: boolean
  upload: (file: File, accept: string) => Promise<string | null>
  onChange: (id: string | null) => void
}

/** Pick a file, upload it, keep its id; shows the current file with open and remove. */
export function FileUpload({ fileId, accept, label, busy, upload, onChange }: FileUploadProps) {
  const { t } = useTranslation()
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0]
          e.target.value = ""
          if (!file) return
          const id = await upload(file, accept)
          if (id) onChange(id)
        }}
      />
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="rounded-full"
        disabled={busy}
        onClick={() => input.current?.click()}
      >
        <Upload aria-hidden /> {busy ? t("resume.uploading") : fileId ? t("resume.replace") : label}
      </Button>
      {fileId && (
        <>
          <FileLink id={fileId}>{t("resume.openFile")}</FileLink>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="rounded-full text-muted-foreground"
            onClick={() => onChange(null)}
          >
            <X aria-hidden /> {t("resume.remove")}
          </Button>
        </>
      )}
    </div>
  )
}
