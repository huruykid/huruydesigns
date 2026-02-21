import { ImageIcon } from "lucide-react";

interface ImageSlotProps {
  slot: string;
  label: string;
  aspectRatio?: string;
  imageSrc?: string;
}

const ImageSlot = ({ slot, label, aspectRatio = "aspect-video", imageSrc }: ImageSlotProps) => {
  if (imageSrc) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
        <img src={imageSrc} alt={label} className="w-full max-h-[600px] object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border-2 border-dashed border-border ${aspectRatio} bg-muted/30 flex flex-col items-center justify-center gap-3 p-6`}
    >
      <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
};

export default ImageSlot;
