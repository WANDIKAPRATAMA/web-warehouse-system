import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Folder, ChevronRight, Plus, Link } from "lucide-react";

export function ContentEditorSkeleton() {
  return (
    <div className="flex h-full animate-pulse">
      {/* Main content area */}
      <div className="flex-1 overflow-auto overflow-x-hidden">
        <div className="flex flex-col gap-6 p-4">
          {/* Country combobox */}
          <Skeleton className="h-10 w-full rounded-md" />

          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Create button */}
          <Skeleton className="h-9 w-[120px] rounded-md" />

          {/* Files section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>

            {/* Tree structure */}
            <div className="flex flex-col gap-1">
              <SlugTreeItemSkeleton depth={0} />
              <SlugTreeItemSkeleton depth={0} hasChildren />
              <SlugTreeItemSkeleton depth={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-[1px] bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function SlugTreeItemSkeleton({
  depth = 0,
  hasChildren = false,
}: {
  depth?: number;
  hasChildren?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex w-full items-center gap-2 rounded px-2 py-1"
        style={{ paddingLeft: `${depth * 24 + 8}px` }}
      >
        {hasChildren ? (
          <>
            <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <Folder className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <Skeleton className="h-4 w-32" />
            <div className="ml-auto">
              <Plus className="h-3 w-3 text-gray-300 dark:text-gray-600" />
            </div>
          </>
        ) : (
          <>
            <div className="h-4 w-4" /> {/* Spacer */}
            <Folder className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <Skeleton className="h-4 w-24" />
          </>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className="ml-6 flex flex-col gap-1 border-l border-gray-200 pl-2 dark:border-gray-700"
          style={{ marginLeft: `${depth * 24 + 24}px` }}
        >
          <SlugTreeItemSkeleton depth={depth + 1} />
          {/* <SlugTreeItemSkeleton depth={depth + 1} hasChildren /> */}
          <SlugTreeItemSkeleton depth={depth + 1} />
        </div>
      )}
    </div>
  );
}

export function EmptyContentState({
  isAuthor = false,
}: {
  isAuthor?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full p-6 inline-block mb-6">
        <Folder className="w-16 h-16 text-purple-600 dark:text-purple-400" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        {isAuthor ? "No Content Yet" : "Content Not Available"}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-lg mb-6">
        {isAuthor
          ? "Create your first content folder to organize your documentation"
          : "This content section is currently empty or not accessible."}
      </p>

      {isAuthor && (
        <Button asChild>
          <Link href="/dashboard/content/create">Create First Content</Link>
        </Button>
      )}
    </div>
  );
}
