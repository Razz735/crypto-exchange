import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { updateUserImage } from "../../data/api";

interface Props {
  currentProfilePicture: string;
}

export const UpdateProfileImageForm = ({ currentProfilePicture }: Props) => {
  const { togglePageLoading, handleBannerMessage, setUser } =
    useGlobalContext();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const updatePicture = async () => {
      togglePageLoading();
      try {
        const user = await updateUserImage(profilePicture);
        setUser(user);
        togglePageLoading();
        handleBannerMessage("success", "Successfully updated profile image");
      } catch (error) {
        togglePageLoading();
        handleBannerMessage("error", "Unable to update image");
      }
    };

    if (profilePicture) {
      updatePicture();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePicture]);

  return (
    <form>
      <label htmlFor="fileUpload">
        <Avatar
          sx={{ border: "solid black 1px" }}
          aria-label="recipe"
          alt={currentProfilePicture}
          src={currentProfilePicture}
        />
      </label>
      <input
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) =>
          setProfilePicture(e.target.files ? e.target.files[0] : null)
        }
      />
    </form>
  );
};