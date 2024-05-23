import useAuthContext from "../../hooks/useAuthContext";
import ProfilePicture from "../../assets/avatars/user.png";

const LoggedInHeader = () => {
  const { user } = useAuthContext();

  return (
    <header className="flex gap-3 items-center mb-6 bg-white rounded shadow p-4">
      <img
        src={user.picture ? user.picture : ProfilePicture}
        alt="profile picture"
        className="w-16 rounded-full"
      />

      <div>
        <h1 className="font-semibold">Hello!</h1>
        <h1 className="text-green-800 font-bold text-xl">
          {user.name || "Guest"}
        </h1>
      </div>
    </header>
  );
};

export default LoggedInHeader;
