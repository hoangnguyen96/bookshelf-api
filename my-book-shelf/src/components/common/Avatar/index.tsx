import Image from "next/image";
import { avatar } from "@app/assets/images";

const Avatar = ({ width = 100, height = 100 }) => {
  return (
    <Image
      src={avatar}
      width={width}
      height={height}
      alt="Avatar user"
      style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }}
    />
  );
};

export default Avatar;
