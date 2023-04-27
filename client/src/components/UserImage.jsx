
const UserImage = ({ image, size = "60px"}) => {
  return (
    <img 
      src={`${import.meta.env.VITE_BASE_URL}/assets/${image}`}
      style={{ objectFit: "cover", borderRadius: "50%" }}
      width={size}
      height={size}
      alt="user_img"
    />
  );
};

export default UserImage;