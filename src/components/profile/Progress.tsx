export default function ProgressBar() {
    return (
        <div>

            <div className="flex items-center justify-between text-sm">

                <span className="font-medium text-slate-700">
                    Step 2 of 2
                </span>

                <span className="font-semibold text-blue-600">
                    100%
                </span>

            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

                <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />

            </div>

        </div>
    );
}