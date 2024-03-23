interface Props {
  title: string
  children: React.ReactNode
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div>
      <div className="flex">
        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
          <div>
            <h5 className="text-3xl text-gray-600 text-center">{title}</h5>
            <div className="mt-2 flex flex-col justify-center gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
