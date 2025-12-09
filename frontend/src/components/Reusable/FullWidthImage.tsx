import { FC, ReactNode } from "react";
import styles from "./FullWidthImage.module.css";

const publicUrl = import.meta.env.BASE_URL;

type FullWidthImageProps = {
  imageUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  children?: ReactNode;
};

const FullWidthImage: FC<FullWidthImageProps> = ({
  imageUrl = `${publicUrl}images/bg.png`,
  videoUrl,
  posterUrl,
  children,
}) => {
  // No CTA/popup state needed

  const backgroundImage = `url(${imageUrl})`;

  return (
    <section className={styles["fwi-wrapper"]}>
      <div
        className={styles["fwi-hero-image"]}
        style={{ backgroundImage }}
      >
        {videoUrl && (
          <video
            className={styles["fwi-hero-video"]}
            src={videoUrl}
            poster={posterUrl || imageUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {children}
      </div>
    </section>
  );
};

export default FullWidthImage;
