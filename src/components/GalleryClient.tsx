import ImageSlider from "./ImageSlider";

interface Slider {
  order: number;
  images: string[];
}

interface Props {
  sliders: Slider[];
  subtitle: string;
}

export default function GalleryClient({ sliders, subtitle }: Props) {
  return (
    <>
      <p className="text-sm text-[var(--color-brand)] mt-1">
        {subtitle}
      </p>
      <div className="mt-10 space-y-8">
        {sliders.map((slider) => (
          <ImageSlider key={slider.order} images={slider.images} order={slider.order} />
        ))}
      </div>
    </>
  );
}
