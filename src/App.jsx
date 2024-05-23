import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get("https://jsonplaceholder.typicode.com/users"),
  });

  useQuery({
    queryKey: ["cookie"],
    queryFn: async () =>
      axios.get("http://localhost:8080/api/v1/auth/cookie", {
        withCredentials: true,
      }),
  });

  const preferences = useQuery({
    queryKey: ["preferences"],
    queryFn: async () =>
      axios.get("http://localhost:8080/api/v1/auth/preferences", {
        withCredentials: true,
      }),
  });

  console.log(usersQuery.data);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Users</h1>

      {usersQuery.isPending && <p>Loading...</p>}
      {usersQuery.isError && <p>{usersQuery.error.message}</p>}

      <ul>
        {usersQuery.data?.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <p>Theme: {JSON.stringify(preferences.data)}</p>
    </div>
  );
}

export default App;
