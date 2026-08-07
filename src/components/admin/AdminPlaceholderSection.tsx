export default function AdminPlaceholderSection({ title }: { title: string }) {
    return (
        <div className="flex h-full flex-col items-center justify-center px-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                This section hasn&apos;t been built yet.
            </p>
        </div>
    );
}
