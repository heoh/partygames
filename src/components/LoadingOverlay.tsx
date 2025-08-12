interface LoadingOverlayProps {
  isOpen: boolean;
  text?: string;
}

export function LoadingOverlay({ isOpen, text = 'Loading...' }: LoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm select-none">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ball loading-lg text-primary"></span>
        <p className="text-gray-200 font-semibold">{text}</p>
      </div>
    </div>
  );
}
