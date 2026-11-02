import ProfileCard from "../components/ProfileCard.js"

function Profile({
  username,
}) {
  return (
    <div id="profile">
        <h2>Your Profile</h2>
        <ProfileCard
            username={username}
      />
    </div>
  );
}

export default Profile;
