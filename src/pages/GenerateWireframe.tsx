import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GenerateWireframe = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const generate = async () => {
    setLoading(true);
    setImageUrl(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-wireframe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        toast({ title: "Wireframe generated!", description: "Review it below and download when ready." });
      } else {
        throw new Error("No image returned");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "wireframes.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Generate Wireframe Image</h1>
      <p className="text-muted-foreground mb-6">
        This generates an annotated wireframe for the EBT Finder case study using AI.
      </p>

      <Textarea
        placeholder="Describe the image you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-6 min-h-[120px]"
      />

      <div className="flex gap-3 mb-8">
        <Button onClick={generate} disabled={loading || !prompt.trim()} size="lg">
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2" />
              Generate Wireframe
            </>
          )}
        </Button>

        {imageUrl && (
          <Button onClick={download} variant="outline" size="lg">
            <Download className="mr-2" />
            Download PNG
          </Button>
        )}
      </div>

      {loading && (
        <div className="rounded-xl border border-border bg-muted/30 aspect-[3/4] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Generating wireframe with AI...</p>
            <p className="text-sm text-muted-foreground/60 mt-1">This may take 15-30 seconds</p>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="rounded-xl border border-border overflow-hidden bg-white">
          <img src={imageUrl} alt="Generated annotated wireframe" className="w-full" />
        </div>
      )}

      {imageUrl && (
        <p className="text-sm text-muted-foreground mt-4">
          Download this image, then upload it to the chat with: "Use this for wireframes"
        </p>
      )}
    </div>
  );
};

export default GenerateWireframe;
