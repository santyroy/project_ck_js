import PageLoyout from "../../layouts/PageLayout";
import FormInput from "../../components/shared/FormInput";
import { ButtonOutline } from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import { useUpdateProfile } from "../../hooks/useProfile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "../../schemas/schema";
import { ErrorMessage } from "../../components/shared/Message";
import { useState } from "react";
import Avatar1 from "../../assets/avatars/avatar_1.jpg";
import Avatar2 from "../../assets/avatars/avatar_2.jpg";
import Avatar3 from "../../assets/avatars/avatar_3.jpg";
import Avatar4 from "../../assets/avatars/avatar_4.jpg";
import Avatar5 from "../../assets/avatars/avatar_5.jpg";

import PropTypes from "prop-types";
import { FaCircleXmark } from "react-icons/fa6";
import LoggedInHeader from "../../components/shared/LoggedInHeader";

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: { name: user.name },
  });

  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useUpdateProfile(axiosPrivate, user.userId, resetField);

  const onSubmit = (data) => {
    mutate({ ...data, picture: avatar });
  };

  return (
    <PageLoyout>
      <section className="flex flex-col">
        <LoggedInHeader />

        <form
          className="flex flex-col gap-4 w-full px-5 py-8 bg-white shadow rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            id="name"
            label="Name"
            type="text"
            mandatory={true}
            register={register}
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}

          <FormInput
            id="password"
            label="Password"
            type="password"
            register={register}
          />
          {errors.password?.message && (
            <ErrorMessage message={errors.password.message} />
          )}

          <div className="flex flex-col h-32">
            <label htmlFor="avatar">Choose your Avatar</label>
            <div className="flex gap-4">
              <Avatar image={Avatar1} setAvatar={setAvatar} />
              <Avatar image={Avatar2} setAvatar={setAvatar} />
              <Avatar image={Avatar3} setAvatar={setAvatar} />
              <Avatar image={Avatar4} setAvatar={setAvatar} />
              <Avatar image={Avatar5} setAvatar={setAvatar} />
            </div>
            {avatar && (
              <div className="flex gap-2 items-center">
                <p className="text-sm">{getAvatarName(avatar)} is selected</p>
                <button onClick={() => setAvatar("")}>
                  <FaCircleXmark className="text-red-700" />
                </button>
              </div>
            )}
          </div>

          <div>
            <ButtonOutline content="Update Profile" />
          </div>
        </form>
      </section>
    </PageLoyout>
  );
};

function getAvatarName(avatar) {
  const arr = avatar.split("/");
  const lastEl = arr[arr.length - 1];
  return lastEl.split(".")[0];
}

function Avatar({ image, setAvatar }) {
  return (
    <div className="h-20 w-20 flex justify-center items-center">
      <img
        src={image}
        className="h-[64px] w-[64px] rounded-full shadow cursor-pointer hover:h-[72px] hover:w-[72px] duration-300 ease-in-out"
        onClick={() => setAvatar(image)}
      />
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  setAvatar: PropTypes.func,
};
export default Profile;
