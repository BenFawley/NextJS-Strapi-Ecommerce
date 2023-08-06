"use client";

//change to server component and use getServerSession

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return <p>Loading...</p>;

  if (session.status === "unauthenticated") {
    router.push("/profile/login");
  }

  //add useEffect to fetch user data

  return <div>Profile Page</div>;
};

export default ProfilePage;
