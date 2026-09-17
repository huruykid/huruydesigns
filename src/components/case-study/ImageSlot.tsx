import { imageDimensions } from "@/lib/imageDimensions";

interface ImageSlotProps {
  slot: string;
  label: string;
  imageSrc?: string;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * A case-study image. Renders nothing when no image exists for the slot, so an
 * unfilled slot never shows an empty placeholder box to visitors.
 */
const ImageSlot = ({ slot, label, imageSrc, priority = false, width, height }: ImageSlotProps) => {
  if (!imageSrc) return null;

  const descriptiveAlt =
    label && label.trim().split(/\s+/).length >= 2
      ? `${label}, case study visual by Huruy Kidanemariam`
      : `${label || "Case study"} visual from Huruy Kidanemariam's UX portfolio`;
  const dims = imageDimensions[imageSrc];
  const w = width ?? dims?.width;
  const h = height ?? dims?.height;

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-muted" data-slot={slot}>
      <img
        src={imageSrc}
        alt={descriptiveAlt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full max-h-[600px] object-contain"
        style={w && h ? { aspectRatio: `${w} / ${h}` } : undefined}
      />
    </div>
  );
};

export default ImageSlot;
