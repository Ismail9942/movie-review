import React from "react";

const Article = () => {
  return (
    <div className="my-8">
      <div>
        <h1 className="font-bold text-center text-3xl my-6">Introduction</h1>
        <p className="text-justify w-[90%] mx-auto">
          Introduction In today's digital age, data security is of utmost
          importance. With the increasing amount of data being exchanged and
          stored online, the risk of cyber threats has also grown significantly.
          Hackers, cybercriminals, and unauthorized entities constantly seek
          ways to access confidential information, making it imperative to adopt
          strong security measures. One of the most effective ways to ensure
          data privacy and protection is Data Encryption. Data Encryption plays
          a crucial role in modern cybersecurity by converting sensitive
          information into an unreadable format. This ensures that even if data
          is intercepted, it remains inaccessible without proper authorization.
          Various industries, including banking, healthcare, and government
          organizations, rely on encryption to secure their sensitive data and
          maintain user trust.
        </p>
      </div>
      <div>
        <h1 className="font-bold text-center text-3xl my-6">
          What is Data Encryption?
        </h1>
        <p className="text-justify w-[90%] mx-auto">
          Data Encryption is a security process in which plaintext (readable
          data) is transformed into an encoded format known as Cipher Text using
          complex algorithms. This encrypted data can only be deciphered and
          accessed using the appropriate decryption key. The primary purpose of
          encryption is to ensure that only authorized users can access
          sensitive information while preventing unauthorized access. Encryption
          is widely used in securing online transactions, emails, confidential
          documents, and personal data. Without the correct decryption key,
          encrypted data appears as meaningless, random characters, making it
          virtually impossible for cybercriminals to exploit. Modern encryption
          methods rely on advanced cryptographic techniques to enhance security.
          These methods include symmetric encryption, where the same key is used
          for both encryption and decryption, and asymmetric encryption, which
          uses a pair of keys (public and private) to ensure secure
          communication.
        </p>
      </div>
    </div>
  );
};

export default Article;
