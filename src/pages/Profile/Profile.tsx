import { useProfile } from "@/store/Context/ProfileContext";
import { StateStatus } from "@/types/global-state-status";

const Profile = () => {
  const { state, searchProfile } = useProfile();

  return (
    <div className="bg-pink-400 min-h-screen">
      <p>Profile Context is working!</p>
      <button onClick={() => searchProfile("newuser1fff23")}>
        Search Profile
      </button>
      {state.status === StateStatus.LOADING && <p>Loading...</p>}
      {state.status === StateStatus.COMPLETED && state.profile && (
        <div>
          <h3>Profile Found:</h3>
          <p>Username: {state.profile.userName}</p>
          <p>Email: {state.profile.email}</p>
        </div>
      )}
      {state.status === StateStatus.ERROR && <p>Error: {state.error}</p>}
    </div>
  );
};

export default Profile;
