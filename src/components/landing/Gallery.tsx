import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type GalleryItem, supabase } from "@/lib/supabase";

const galleryPhotos = Object.entries(
  import.meta.glob("../../assets/gallery/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    import: "default",
  }),
).map(([path, src]) => ({
  src: src as string,
  title: path
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) ?? "Foundation moment",
}));

export function Gallery() {
  const [uploadedPhotos, setUploadedPhotos] = useState<GalleryItem[]>([]);

  useEffect(() => {
    void supabase?.from("gallery_items").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setUploadedPhotos((data ?? []) as GalleryItem[]);
    });
  }, []);
  const photos = uploadedPhotos.map((photo) => ({
    src: supabase?.storage.from("gallery").getPublicUrl(photo.image_path).data.publicUrl ?? "",
    title: photo.caption || "Foundation moment",
  }));
  const allPhotos = photos.length ? photos : galleryPhotos;

  return (
    <section id="gallery" className="scroll-mt-20 bg-surface-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">In the community</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
            Our Foundation Gallery
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Moments from the people, programs, and communities we are proud to serve.
          </p>
        </div>

        {allPhotos.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" data-reveal>
            {allPhotos.map((photo) => (
                <figure key={photo.src} className="group relative aspect-square overflow-hidden bg-secondary/10">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-secondary/85 p-3 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                    <p className="font-semibold">{photo.title}</p>
                  </figcaption>
                </figure>
              ))}
          </div>
        ) : (
          <div className="mt-12 flex min-h-56 items-center justify-center border border-dashed border-primary/30 bg-white p-8 text-center">
            <div>
              <ImageIcon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
              <p className="mt-4 font-display text-lg font-semibold text-secondary">New moments coming soon</p>
              <p className="mt-2 text-sm text-muted-foreground">Foundation staff can add photos from VS Code.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
