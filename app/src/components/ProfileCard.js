import Baseline from "./Baseline";

function ProfileCard({
  username,
}) {
    return (
        <span class="profile">
            <h1>Hello, {username}</h1>
            <Baseline />

        </span>
    );
}

export default ProfileCard;