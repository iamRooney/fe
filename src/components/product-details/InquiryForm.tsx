export default function InquiryForm() {
  return (
    <div className="rounded-xl border-2  bg-white p-6">
      <h2 className="text-2xl font-semibold text-gray-500">
        Send Inquiry to Supplier
      </h2>

      <form className="mt-6 space-y-5">
        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            Quantity Required
          </label>

          <div className="flex items-center text-gray-500">
            <input
              type="number"
              defaultValue={1}
              className="w-full rounded-l-lg border px-4 py-3 outline-none focus:text-blue-700"
            />

            <span className="rounded-r-lg border border-l-0 bg-gray-50 px-4 py-3 ">
              Pieces
            </span>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            Your Message
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border p-4 outline-none focus:text-blue-700 text-gray-500"
            placeholder="I am interested in this product. Please share the best quotation..."
          />
        </div>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            Name
          </label>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            City
          </label>

          <input
            type="text"
            placeholder="City"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            Phone Number
          </label>

          <input
            type="number"
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-500">
            Contact Email
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#F89A1C] py-4 text-lg font-semibold text-white transition hover:bg-[#e88910]"
        >
          Send Inquiry Now
        </button>

        <p className="text-center text-xs text-gray-500">
          By clicking submit, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </div>
  );
}