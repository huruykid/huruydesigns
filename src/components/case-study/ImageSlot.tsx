import { useState, useRef } from "react";
import { ImageIcon, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ImageSlotProps {
  slot: string;
  label: string;
  aspectRatio?: string;
  imageSrc?: string;
  projectId?: string;
  onUploaded?: (slot: string, url: string) => void;
}

const ImageSlot = ({ slot, label, aspectRatio = "aspect-video", imageSrc, projectId, onUploaded }: ImageSlotProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !projectId) return;

    setUploading(true);
    try {
      const path = `${projectId}/${slot}.png`;

      // Upload to storage (upsert)
      const { error: uploadError } = await supabase.storage
        .from("case-study-images")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("case-study-images")
        .getPublicUrl(path);

      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Upsert DB record
      const { error: dbError } = await supabase
        .from("case_study_images" as any)
        .upsert({ project_id: projectId, slot, image_url: publicUrl } as any, { onConflict: "project_id,slot" });

      if (dbError) throw dbError;

      onUploaded?.(slot, publicUrl);
      toast({ title: "Image uploaded", description: `"${label}" updated successfully.` });
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const uploadButton = projectId && (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
        aria-label={`Upload image for ${label}`}
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
      </button>
    </>
  );

  if (imageSrc) {
    return (
      <div className={`relative group rounded-xl overflow-hidden border border-border ${aspectRatio} bg-muted`}>
        {uploadButton}
        <img src={imageSrc} alt={label} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative group rounded-xl border-2 border-dashed border-border ${aspectRatio} bg-muted/30 flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:border-accent/50 transition-colors`}
      onClick={() => projectId && fileInputRef.current?.click()}
    >
      {uploadButton}
      {uploading ? (
        <Loader2 className="h-10 w-10 text-muted-foreground/40 animate-spin" />
      ) : (
        <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
      )}
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Click to upload an image</p>
      </div>
    </div>
  );
};

export default ImageSlot;
