export default function Analytics() {
  return (
    <div className="col-span-6 md:col-span-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="text-secondary col-span-1 flex flex-col items-center justify-center gap-2 rounded-md border border-gray-600 px-3 py-6 text-center">
          <img
            src="/vectors/expenses-vector.png"
            alt=""
            className="h-10 w-10"
          />
          <h3 className="text-lg font-medium text-green-900">100%</h3>
          <h5 className="text-sm font-light leading-snug">
            Kesehatan Financial
          </h5>
        </div>
        <div className="text-secondary col-span-1 flex flex-col items-center justify-center gap-2 rounded-md border border-gray-600 px-3 py-6 text-center">
          <img
            src="/vectors/expenses-vector.png"
            alt=""
            className="h-10 w-10"
          />
          <h3 className="text-lg font-medium text-green-900">100%</h3>
          <h5 className="text-sm font-light leading-snug">
            Kesehatan Financial
          </h5>
        </div>
      </div>
    </div>
  )
}
