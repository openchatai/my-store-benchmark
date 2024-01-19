import { BotIcon } from "lucide-react"

export function EmptyState({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <BotIcon className="h-16 w-16 text-gray-500 dark:text-gray-400" />
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{title}</h1>
        </div>
    )
}
