interface SectionHeaderProps {
  subtitle: string;
  title: string;
  gradientClass?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  gradientClass = "from-ocean-400 to-ocean-600",
  titleClassName = "text-gray-900",
  subtitleClassName = "text-ocean-600",
  className = "mb-16",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <p
        className={`${subtitleClassName} font-body text-sm tracking-[0.2em] uppercase mb-3`}
      >
        {subtitle}
      </p>
      <h2
        className={`font-display text-4xl md:text-5xl ${titleClassName} mb-4`}
      >
        {title}
      </h2>
      <div
        className={`w-20 h-1 bg-gradient-to-r ${gradientClass} mx-auto rounded-full`}
      />
    </div>
  );
}
