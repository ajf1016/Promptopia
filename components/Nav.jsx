"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/">
        <Image
          src="./assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="Promptopia logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop nav */}
      <div className="sm:flex-hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create prompt
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              className="rounded-full"
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="Profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  href="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  href="/create-prompt"
                >
                  Create prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {setToggleDropdown(false); signOut();}}
                  className="mt-5 w-full black_btn"
                >Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
