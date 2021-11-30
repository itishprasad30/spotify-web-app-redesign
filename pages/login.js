import { getProviders, signIn } from "next-auth/react";
const login = ({ providers }) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black">
      <img
        className="w-80 rounded-2xl justify-center mb-5"
        src="https://www.scotsman.com/webimg/b25lY21zOmQ4MjI4Mjg5LTcyNjgtNGM0YS1hMmI3LTE4ZjViNzJhMmZhZTpkOTY1NWZjNy00NTJiLTQ5MDctYWMwMC00ODE1MWQwNGMyZjE=.jpg?width=2048&enable=upscale"
        alt="spotify"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#1DB954] rounded-2xl p-5 text-white "
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const provider = await getProviders();

  return {
    props: {
      providers: provider,
    },
  };
}
