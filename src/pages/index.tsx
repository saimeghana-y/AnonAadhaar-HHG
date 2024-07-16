import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => true;
  useTestAadhaar: boolean;
};

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  const switchAadhaar = () => {
    setUseTestAadhaar(!useTestAadhaar);
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  return (
    <div>
      <section id="home" className="relative z-10 pb-28 pt-48">
        <main className="mb-8 flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
          <h1 className="font-bold text-2xl">
            Anon Aadhaar Submission - HACKER HOUSE GOA
          </h1>
          <p>Prove your Identity anonymously using your Aadhaar card.</p>

          <LogInWithAnonAadhaar nullifierSeed={1234} />
        </main>
        {anonAadhaar.status === "logged-in" && (
          <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8 shadow-lg bg-white mb-8">
            <>
              <p>✅ Proof is valid</p>
              <p>Got your Aadhaar Identity Proof</p>
              <>Welcome anon!</>
              {latestProof && (
                <AnonAadhaarProof
                  code={JSON.stringify(
                    typeof latestProof === "string"
                      ? JSON.parse(latestProof)
                      : latestProof,
                    null,
                    2
                  )}
                />
              )}
            </>
          </div>
        )}
        {anonAadhaar.status === "logged-in" && (
          <div className="flex flex-col items-center gap-8 rounded-2xl max-w-screen-sm mx-auto p-8 shadow-lg bg-white">
            <button
              onClick={connectMetaMask}
              type="button"
              className="rounded bg-blue-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Connect MetaMask
            </button>
            {walletAddress && (
              <p className="mt-4 rounded bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
                Connected Wallet: {walletAddress}
              </p>
            )}
          </div>
        )}
        <div
          className="absolute left-0 top-0 -z-10 h-full w-full opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgb(62, 125, 255) 0%, rgba(62, 125, 255, 0) 100%)",
          }}
        ></div>
        <img
          alt="shape"
          loading="lazy"
          width="411"
          height="276"
          decoding="async"
          data-nimg="1"
          className="absolute left-0 top-0 -z-10"
          src="/hero-shape-1.svg"
          style={{ color: "transparent" }}
        />
        <img
          alt="shape"
          loading="lazy"
          width="820"
          height="692"
          decoding="async"
          data-nimg="1"
          className="absolute right-0 top-0 -z-10"
          src="/hero-shape-2.svg"
          style={{ color: "transparent" }}
        />
      </section>
    </div>
  );
}
