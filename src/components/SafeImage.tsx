import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export default function SafeImage({
  src,
  alt,
  ...props
}: Readonly<SafeImageProps>) {
  const isLocalhost =
    src.includes("localhost") ||
    src.includes("127.0.0.1") ||
    src.includes("192.168.") ||
    src.includes("10.0.");

  if (process.env.NODE_ENV === "development" && isLocalhost) {
    return (
      <img
        src={src}
        alt={alt}
        {...(props.className && { className: props.className })}
        {...(props.style && { style: props.style })}
      />
    );
  }

  return <Image src={src} alt={alt} {...props} />;
}
