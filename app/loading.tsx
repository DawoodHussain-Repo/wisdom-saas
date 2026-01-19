import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-lg font-medium">
          Loading...
        </p>
      </div>
    </main>
  );
}
