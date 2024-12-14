import { Link } from "react-router-dom";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  to?: string;
};

export function Image({ src, alt, className, to }: ImageProps) {
  function Img() {
    return <img src={src} alt={alt} className={`${className}`} />;
  }

  return (
    <>
      {to ? (
        <Link to={to}>
          <Img />
        </Link>
      ) : (
        <Img />
      )}
    </>
  );
}
