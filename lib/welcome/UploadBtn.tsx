import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { uploadMedia } from 'zvijude/cloudinary/upload'
import Icon, { IconNames } from 'zvijude/icon'

export function UploadBtn({
  className,
  accept,
  multiple,
  getMedia,
  lbl,
  icon,
  name = 'media',
  defaultValue,
  required,
}: UploadBtnProps) {
  const [loading, setLoading] = useState<boolean | string>(false)
  const [urlState, setUrlState] = useState<string[] | string>(
    defaultValue || ''
  )
  const [fileNames, setFileNames] = useState<string>()

  async function onChange(e) {
    setLoading('load')

    const fileList = Array.from(e.target.files) as File[]
    setFileNames(fileList.map((file) => file.name).join(', '))

    const urls = await uploadMedia(e)

    if (!urls) return
    const mediaBtn = document.getElementById('mediaBtn')
    mediaBtn?.classList.add('animate-pulse')

    if (getMedia) getMedia(multiple ? urls : urls[0])

    setUrlState(multiple ? urls.join(',') : urls[0])

    mediaBtn?.classList.remove('animate-pulse')

    setLoading('finish')
    setTimeout(() => setLoading(false), 2000)
  }

  const stateObj = {
    iconName: icon?.name || 'image',
    lbl: lbl || 'העלאת תמונה',
  }

  if (loading == 'load') {
    stateObj.lbl = 'טוען...'
    stateObj.iconName = 'spinner'
  }
  if (loading == 'finish') {
    stateObj.lbl = 'הועלה בהצלחה'
    stateObj.iconName = 'check-double'
  }

  return (
    <div className="flex max-w-lg">
      <label
        className={twMerge(
          'bg-solid h-10 px-4 text-white inline-flex items-center gap-4 min-w-fit justify-center font-semibold rounded-md shadow cursor-pointer hover:bg-solid/95 transition-all hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        id="mediaBtn"
      >
        <Icon
          name={stateObj.iconName}
          className={twMerge(
            'bg-white',
            icon?.cls,
            loading == 'load' && 'animate-spin'
          )}
          type={icon?.type || 'sol'}
        />
        <span>{stateObj.lbl}</span>
        <input
          type="file"
          onChange={onChange}
          multiple={multiple}
          accept={`${accept}/*`}
          className="hidden"
        />
        <input
          type="text"
          className="hidden"
          required={required}
          name={name}
          readOnly
          value={urlState}
        />
      </label>

      <p className="text-sm text-gray-700">
        {fileNames
          ? fileNames
          : (defaultValue ?? '').length > 20
          ? `${(defaultValue ?? '').slice(0, 20)}...`
          : defaultValue ?? ''}
      </p>
    </div>
  )
}

type UploadBtnProps = {
  name?: string
  className?: string
  accept?: 'image' | 'video' | 'audio'
  multiple?: boolean
  lbl?: string
  icon?: {
    name?: IconNames
    type?: 'sol' | 'reg' | 'lit' | undefined
    cls?: string
  }
  getMedia?: (urls: string[] | string) => void
  defaultValue?: string
  required?: boolean
}
