import React, { useCallback, useEffect, useRef, useState } from "react";

function Container() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  let passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  }, [password]);

  return (
    <div className="bg-zinc-800 p-5 rounded-[20px] scale-[1.2]">
      <h1 className="text-5xl text-zinc-100 font-semibold">
        Password Generator
      </h1>
      <div className="fields flex justify-between my-5 bg-zinc-900 rounded">
        <input
          className=" bg-transparent p-2 w-full outline-none text-zinc-100 cursor-default"
          type="text"
          placeholder="Password"
          value={password}
          ref={passwordRef}
          disabled
        />
        <button className="bg-blue-500 px-3 rounded" onClick={copyPassword}>
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="checks flex justify-between gap-5">
        <input
          type="range"
          min={8}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <div>
          <h5>
            Length: <span>{length}</span>
          </h5>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <span> Numbers</span>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <span> Characters</span>
        </div>
      </div>
    </div>
  );
}

export default Container;
